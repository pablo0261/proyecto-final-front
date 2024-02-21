import React, { useEffect, useState } from 'react'
import style from './UserServices.module.sass'
import FormContract from '../../../../components/Form/FormContract/FormContract';

function UserServices(props) {

    const { infoUser, infoUserLog, idOpportunitie } = props
    const [servicesData, setServicesData] = useState([])

    useEffect(() => {
        if (infoUser.categories.length != 0) {
            const services = infoUser.categories.find(
                (category) => category.idCategorie === 1
              );
            if (services.categories_options.length != 0) {
                const serviceOption = services.categories_options.map(
                    (option) => {
                        const newService = {
                            idOption: option.idOption,
                            description: option.description,
                            price: option.people_options[0].price,
                        }
                        return newService
                    }
                )
                setServicesData(serviceOption)
            }
        }
    }, []);

    const [showContract, setShowContract] = useState(false)
    const [contractForm, setContractForm] = useState({
        idOpportunitie: idOpportunitie,
        idPeople: infoUserLog.idPeople,
        idService: "",
        price: "",
        dateOfService: "",
        timeOfService: "",
        durationOfService: ""
    })

    const handleContract = (idOption, price) => {
        setContractForm({
            ...contractForm, 
            idService: idOption, 
            price: price,
            dateOfService: "",
            timeOfService: "",
            durationOfService: ""
        })
        setShowContract(true)
    }

    return (
        <div className={style.background} >
            <div className={style.servicesWrapper}>
                <div className={style.serviceItem}>
                    <div className={style.column1}>
                        <p className={style.column1title}>Servicios</p>
                    </div>
                    {servicesData.map((service) => (
                        <div key={service.idOption} className={style.items}>
                            <div className={style.descriptionBox}>{service.description}</div>
                        </div>
                    ))}
                </div>
                <div className={style.priceList}>
                    <div className={style.column2}>
                        <p className={style.column2title}>Precio x Hora</p>
                    </div>
                    {servicesData.map((service) => (
                        <div key={service.idOption} className={style.priceBox}>$ {service.price}</div>
                    ))}
                </div>
                <div className={style.contratList}>
                    <div className={style.column3}>
                        {servicesData.map((service) => (
                            <button key={service.idOption} className={style.contratItem} onClick={() => handleContract(service.idOption, service.price)}>
                                Contratar este Servicio
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {showContract && <FormContract contractForm={contractForm} setContractForm={setContractForm} setShowContract={setShowContract}/>}
        </div>
    )
}

export default UserServices