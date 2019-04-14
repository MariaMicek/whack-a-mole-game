import React from 'react'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const ModalWindow = (props) => {
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
            </div>
        </Modal>
    )
}

export default ModalWindow
