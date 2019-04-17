import React from 'react'
import Field from './Field'
import style from './style.module.css'

const GameBoard = (props) => {
    return (
        <div
            className={props.className}
        >
            {
                props.fields.map(
                    (row, rowIndex) => (
                        <div
                            key={'row' + rowIndex}
                            className={style['board-row']}
                        >
                            {
                                row.map(
                                    (field, fieldIndex) => {
                                        return (
                                            <Field
                                                onUserClick={() => props.onUserClick(field)}
                                                key={fieldIndex}
                                                className={
                                                    props.randomField === field ?
                                                        style['field'] + ' ' + style['active']
                                                        :
                                                        style['field']
                                                }
                                            />
                                        )
                                    }
                                )
                            }
                        </div>
                    )
                )
            }
        </div>
    )
}

export default GameBoard
