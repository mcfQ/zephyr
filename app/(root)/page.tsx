import HeaderBox from "@/components/HeaderBox"
import RightSidebar from "@/components/RightSidebar"
import TotalBalanceBox from "@/components/TotalBalanceBox"

const Home = () => {
	const loggedIn = { firstName: "Q", lastName: "T", email: "loremipsum@gmail.com" }

	return (
		<section className='home'>
			<div className='home-content'>
				<header className='home-header'>
					<HeaderBox
						type='greeting'
						title='Welcome'
						user={loggedIn?.firstName || "Guest"}
						subtext='Access and manage your account and transactions efficiently.'
					/>
					<TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1100.1} />
				</header>
			</div>

			<RightSidebar
				user={loggedIn}
				transactions={[]}
				banks={[{ currentBalance: 111.1 }, { currentBalance: 111.1 }]}
			/>
		</section>
	)
}

export default Home
