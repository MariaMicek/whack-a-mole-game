import React from 'react'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import style from './style.module.css'

const ModalWindow = (props) => {
    const modifiedAllResults = props.allResults.map(
        ([key, value]) => (
            {
                key,
                ...value
            }
        )
    )

    const sortedResults = modifiedAllResults.sort((x, y) => y.result - x.result)
    const threeBestResults = sortedResults.filter((el, index) => index < 3)

    return (
        <Modal
            open={props.isModalOpen}
            onClose={props.toggleModal}
            className={style['modal']}
        >
            <div className={style['modal-div']}>
                <TextField
                    label={'Enter your name'}
                    margin={'dense'}
                    variant={'outlined'}
                    value={props.name}
                    onChange={(event) => props.onChangeName(event)}
                    style={{marginBottom: '15px'}}
                />
                <Button
                    variant={'contained'}
                    onClick={props.saveResult}
                >
                    SAVE RESULT
        		</Button>
                <h2 className={style['modal-h2']}>Ranking:</h2>
                {
                    threeBestResults.map(
                        (el, index) => (
                            <p
                                key={el.key}
                                className={
                                    el.name === props.name && el.result === props.result ?
                                    style['bold-result'] + ' ' + style['p-modal']
                                        :
                                        style['p-modal']
                                }
                            >
                                {(index + 1) + '. ' + el.name + ': ' + el.result}
                            </p>
                        )
                    )
                }

            </div>
        </Modal>
    )
}

export default ModalWindow
