import React from 'react'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
            className={'modal'}
        >
            <div className={'modal-div'}>
                <TextField
                    label={'Enter your name'}
                    margin={'dense'}
                    variant={'outlined'}
                    value={props.name}
                    onChange={(event) => props.onChangeName(event)}
                />
                <Button
                    variant={'contained'}
                    onClick={props.saveResult}
                >
                    SAVE
        		</Button>
                <h2 className={'modal-h2'}>Ranking:</h2>
                {
                    threeBestResults.map(
                        (el, index) => (
                            <p
                                key={el.key}
                                className={
                                    el.name === props.name && el.result === props.result ?
                                        'bold-result p-modal'
                                        :
                                        'p-modal'
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
