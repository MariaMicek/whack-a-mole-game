import React, { Component } from 'react'
import GameBoard from './GameBoard'
import ModalWindow from './Modal'
import Button from '@material-ui/core/Button'
import { database } from './firebaseConfig'

class Game extends Component {
	state = {
		wholes: [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
			[10, 11, 12]
		],
		isGameStarted: false,
		isGameFinished: false,
		isModalOpen: false,
		isSecondLevelStarted: false,
		interval: null,
		randomWhole: null,
		result: null,
		name: '',
		allResults: [],
		isResultSaved: false,
		score: 0,
	}

	componentDidMount = () => {
		database.ref('/results/').on(
			'value',
			snapshot => this.setState({ allResults: Object.entries(snapshot.val()) })
		)
	}

	randomWhole = () => {
		const randomRowIndex = Math.floor(Math.random() * this.state.wholes.length)
		const randomRowArray = this.state.wholes[randomRowIndex]
		const randomWholeIndex = Math.floor(Math.random() * randomRowArray.length)
		const randomWhole = this.state.wholes[randomRowIndex][randomWholeIndex]
		if (randomWhole === this.state.randomWhole) {
			return this.randomWhole()
		}
		this.setState({ randomWhole: randomWhole })
	}

	startGame = () => {
		this.setState({
			isGameStarted: true,
			isGameFinished: false,
			score: 0,
		})
		this.startLevel1()
		this.endGame()
	}

	startLevel1 = () => {
		this.randomWhole()
		const showMole = setInterval(
			() => {
				this.checkLevel()
				this.randomWhole()
			},
			1700
		)
		this.setState({ interval: showMole })
	}

	checkLevel = () => {
		if (this.state.isSecondLevelStarted) {
			clearInterval(this.state.interval)
			this.startLevel2()
		}
	}

	startLevel2 = () => {
		this.randomWhole()
		const showMole = setInterval(
			this.randomWhole,
			1000
		)
		this.setState({ interval: showMole })
	}

	nextMove = () => {
		if (this.state.isSecondLevelStarted) {
			clearInterval(this.state.interval)
			this.startLevel2()
		} else {
			clearInterval(this.state.interval)
			this.startLevel1()
		}
	}

	countScores = () => {
		this.setState({ score: this.state.score + 1 })
		if (this.state.score + 1 >= 9) {
			this.setState({ isSecondLevelStarted: true })
			clearInterval(this.state.interval)
		}
	}

	onUserClick = (userWhole) => {
		if (this.state.randomWhole === userWhole) {
			this.countScores()
			this.nextMove()
		}
	}

	endGame = () => {
		setTimeout(
			() => {
				clearInterval(this.state.interval)
				this.setState({
					isGameFinished: true,
					isGameStarted: false,
					isSecondLevelStarted: false,
					randomWhole: null,
					result: this.state.score,
					isModalOpen: true,
				})
			},
			120000
		)
	}

	onChangeName = (event) => {
		this.setState({ name: event.target.value })
	}

	saveResult = () => {
		if (this.state.isResultSaved) return
		database.ref('/results/').push({
			name: this.state.name,
			result: this.state.result
		})
		this.setState({ isResultSaved: true })
	}

	toggleModal = () => {
		this.setState({ isModalOpen: !this.state.isModalOpen })
	}

	render() {
		return (
			<div className={'container'}>
				<h1 className={'h1'}>WHACK A MOLE</h1>
				<h2 className={'h2'}>{this.state.score}</h2>
				<GameBoard
					wholes={this.state.wholes}
					onUserClick={this.onUserClick}
					className={'board'}
					randomWhole={this.state.randomWhole}
				/>
				{
					!this.state.isGameStarted ?
						<Button
							variant={'contained'}
							onClick={this.startGame}
						>
							START
        				</Button>
						:
						null
				}
				<ModalWindow
					result={this.state.result}
					name={this.state.name}
					onChangeName={this.onChangeName}
					allResults={this.state.allResults}
					saveResult={this.saveResult}
					isModalOpen={this.state.isModalOpen}
					toggleModal={this.toggleModal}
				/>

			</div>
		)
	}
}

export default Game
