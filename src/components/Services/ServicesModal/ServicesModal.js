import './Servicesmodal.css'
import Button from "../../Button"
import ServiceForm from '../ServicesFormik/ServicesFormik.js'
export default function ServicesModal(props) {


    return (
        <>
            {props.show === true ?
                < div className="modal" onClick={props.hideModal}>{/*CLOSING THE MODAL AT THE CLICK OUTSIDE OF THE MODAL*/}
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h4 className="modal-title">{props.titolo}</h4>
                        </div>
                        <div className="modal-body">
                            <ServiceForm
                                hideModal={props.hideModal}
                                serviceModify={props.serviceModify}
                                modifyServiceList={props.modifyServiceList}
                                filterServices={props.filterServices}
                                action={props.action}>
                                {props.text}
                            </ServiceForm>
                        </div>
                        <div className="modal-footer">
                            <Button function={props.hideModal} className="button" >Chiudi</Button></div>{/*CLOSING THE MODAL*/}
                    </div>
                </div>
                :
                null
            }
        </>
    )
}