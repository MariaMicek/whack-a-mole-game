import React, { Component } from 'react'
import GameBoard from './GameBoard'
import ModalWindow from './Modal'
import Button from '@material-ui/core/Button'
import { database } from './firebaseConfig'
import style from './style.module.css'

class Game extends Component {
	state = {
		fields: [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
			[10, 11, 12]
		],
		isGameStarted: false,
		isGameFinished: false,
		isModalOpen: false,
		interval: null,
		randomField: null,
		result: null,
		name: '',
		allResults: [],
		isResultSaved: false,
		score: 0,
		time: 120,
		timeTick: 1500,
	}

	componentDidMount = () => {
		database.ref('/results/').on(
			'value',
			snapshot => this.setState({ allResults: Object.entries(snapshot.val()) })
		)
	}

	randomField = () => {
		const randomRowIndex = Math.floor(Math.random() * this.state.fields.length)
		const randomRowArray = this.state.fields[randomRowIndex]
		const randomFieldIndex = Math.floor(Math.random() * randomRowArray.length)
		const randomField = this.state.fields[randomRowIndex][randomFieldIndex]
		if (randomField === this.state.randomField) {
			return this.randomField()
		}
		this.setState({ randomField: randomField })
	}

	startGame = () => {
		this.setState({
			isGameStarted: true,
			isGameFinished: false,
			isResultSaved: false,
			name: '',
			score: 0,
			time: 120,
		})
		this.nextMove(this.state.timeTick)
		this.endGame()
	}

	nextMove = (timeTick) => {
		this.randomField()
		const showMole = setInterval(
			() => this.randomField(),
			timeTick
		)
		this.setState({ interval: showMole })
	}

	countScores = () => {
		this.setState({ score: this.state.score + 1 })
	}

	increaseLevel = () => {
		if (this.state.score === 8) {
			this.setState({ timeTick: 1200 })
		}
		if (this.state.score === 28) {
			this.setState({ timeTick: 900 })
		}
		if (this.state.score === 58) {
			this.setState({ timeTick: 600 })
		}
	}

	onUserClick = (userWhole) => {
		if (this.state.randomField === userWhole) {
			this.countScores()
			this.increaseLevel()
			clearInterval(this.state.interval)
			this.nextMove(this.state.timeTick)
		}
	}

	endGame = () => {
		const timerInterval = setInterval(
			() => this.setState({ time: this.state.time - 1 }),
			1000
		)

		setTimeout(
			() => {
				clearInterval(this.state.interval)
				clearInterval(timerInterval)
				this.setState({
					isGameFinished: true,
					isGameStarted: false,
					isSecondLevelStarted: false,
					randomField: null,
					result: this.state.score,
					timeTick: 1500,
				})
				setTimeout(
					() => this.setState({ isModalOpen: true }),
					1200
				)
			},
			120000
		)
	}

	onChangeName = (event) => {
		this.setState({ name: event.target.value })
	}

	saveResult = () => {
		if (this.state.isResultSaved) return
		if (this.state.name === '') return
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
			<div className={style['container']}>
				<h1 className={style['h1']}>WHACK A MOLE</h1>
				<h2 className={style['h2']}>
					<div>
						TIME: {this.state.time}
					</div>
					<div>
						SCORE: {this.state.score}
					</div>
				</h2>
				<GameBoard
					fields={this.state.fields}
					onUserClick={this.onUserClick}
					className={style['board']}
					randomField={this.state.randomField}
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
