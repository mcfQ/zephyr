"use server"

import { ID, Query } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"

const {
	APPWRITE_DATABASE_ID: DATABASE_ID,
	APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
	APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
	try {
		const { database } = await createAdminClient()
		console.log("Database ID:", DATABASE_ID)
		console.log("User Collection ID:", USER_COLLECTION_ID)
		console.log("Querying for userId:", userId)
		const user = await database.listDocuments(DATABASE_ID!, USER_COLLECTION_ID!, [
			Query.equal("userId", userId),
		])
		console.log("Query result:", user)
		if (!user.documents || user.documents.length === 0) {
			console.error("No user found with the specified userId:", userId)
			return null
		}

		return parseStringify(user.documents[0])
	} catch (error) {
		console.error("Error fetching user info:", error)
	}
}

export const signIn = async ({ email, password }: signInProps) => {
	try {
		const { account } = await createAdminClient()
		const session = await account.createEmailPasswordSession(email, password)

		cookies().set("appwrite-session", session.secret, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production", // use 'secure' in production
		})

		if (!session.userId) {
			console.error("Session does not contain userId")
			return null // Handle the error as needed
		}

		const user = await getUserInfo({ userId: session.userId })
		if (!user) {
			return null // Handle the case where user info is not found
		}

		return parseStringify(user)
	} catch (error) {
		console.error("Error in signIn:", error)
	}
}

export const signUp = async (userData: SignUpParams) => {
	const { email, password, firstName, lastName } = userData

	try {
		const { account } = await createAdminClient()

		const newUserAccount = await account.create(
			ID.unique(),
			email,
			password,
			`${firstName} ${lastName}`
		)

		// Create a corresponding user entry in your custom database
		// const { database } = await createAdminClient()
		// await database.createDocument(USER_COLLECTION_ID!, {
		// 	userId: newUserAccount.$id,
		// 	email,
		// 	name: `${firstName} ${lastName}`,
			// Add other necessary fields
		// })


		const session = await account.createEmailPasswordSession(email, password)

		cookies().set("appwrite-session", session.secret, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
		})

		return parseStringify(newUserAccount)
	} catch (error) {
		console.error("Error", error)
	}
}

export async function getLoggedInUser() {
	try {
		const { account } = await createSessionClient()

		const user = await account.get()

		return parseStringify(user)
	} catch (error) {
		console.log(error)
		return null
	}
}

export const logoutAccount = async () => {
	try {
		const { account } = await createSessionClient()
		await account.deleteSession("current")
		cookies().delete("appwrite-session")
	} catch (error) {
		console.error("Error during logout:", error)
	}
}
