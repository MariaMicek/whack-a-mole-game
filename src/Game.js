import React, { Component } from 'react'
import GameBoard from './GameBoard'
import Button from '@material-ui/core/Button'

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
		isSecondLevelStarted: false,
		interval: null,
		randomWhole: null,
		score: 0,
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
				})
			},
			30000
		)
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

			</div>
		)
	}
}

export default Game
