import React, { useEffect, useState } from 'react'
import style from './Reports.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import { getReports } from '../../redux/actions'
import axios from 'axios'

function Reports() {

    const reports = useSelector(state => state.reports)
    const infoUserLog = useSelector(state => state.infoUserLog)
    const dispatch = useDispatch()
    const [report, setReport] = useState([])
    const [isSelected, setIsSelected] = useState("")
    const [message, setMessage] = useState({
        idQuestion: "",
        response: ""
    })

    useEffect(() => {
        const reportAxios = async () => {
            try {
                if (infoUserLog.typeOfPerson === 'administrator') {
                    dispatch(getReports())
                } else {
                    const query = `&senderMail=${infoUserLog.email}`
                    dispatch(getReports(query))
                }
            } catch (error) {
                window.alert(error)
            }
        }
        reportAxios()
    }, [])

    const handleSelectedOpportunitie = async (idQuestion) => {
        setIsSelected(idQuestion)
        setReport(reports.filter(report => report.idQuestion === idQuestion))
        setMessage({ idQuestion: idQuestion, response: "" })
    }

    const handleChangeMessage = (event) => {
        setMessage({ ...message, response: event.target.value })
    }

    const handleSendChat = (event) => {
        event.preventDefault()
        if (!Object.values(message).some((msg) => msg === "")) {
            axios.put(`${REACT_APP_API_URL}/questions`, message)
                .then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        setMessage({ ...message, message: "" })
                    }
                })
                .catch((reason) => console.log(reason))
        } else {
            window.alert("Escribe un mensaje")
        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.connectionsWrapper}>
                <div className={style.listWrapper}>
                    {
                        reports.length > 0 && reports.map(report =>
                            <div
                                key={report.idQuestion}
                                className={isSelected === report.idQuestion ? style.listReportSelected : style.listReport}
                                onClick={() => { handleSelectedOpportunitie(report.idQuestion) }}>
                                <div className={style.userWrapper}>
                                    <p className={style.textUser}>{report.title}</p>
                                    <p className={style.textDate}>{report.idQuestion}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    report.length > 0
                        ?
                        <div className={style.reportWrapper}>
                            <div className={infoUserLog.typeOfPerson === 'administrator' ? style.msgWrapper : style.msgWrapperClient}>
                                <div className={report[0].senderMail === infoUserLog.email ? style.msgBoxOwner : style.msgBoxOther}>
                                    <p className={style.reportTitle}>{report[0].title}</p>
                                    <p className={style.reportMsg}>{report[0].message}</p>
                                    <p>{report[0].fullName}</p>
                                    <p>{report[0].email}</p>
                                </div>
                            </div>
                            {
                                infoUserLog.typeOfPerson === 'administrator' &&
                                <div className={style.inputWrapper}>
                                    <form onSubmit={handleSendChat} className={style.formChat}>
                                        <input
                                            type='text'
                                            name='chat'
                                            value={message.response}
                                            placeholder='Escribe un mensaje'
                                            onChange={handleChangeMessage}
                                            className={style.inputChat} />
                                        <button type='submit' className={style.buttonChat}>Enviar</button>
                                    </form>
                                </div>
                            }
                        </div>
                        :
                        <div className={style.reportWrapper}>Contenido</div>
                }
            </div>
        </div>
    )
}

export default Reports