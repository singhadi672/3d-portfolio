import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faHashnode, faLinkedin, faMedium } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { contact } from '../../../apiService'
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer'

export default function Contact() {

    const [contactsData, setContactsData] = useState(null)
    const formRef = useRef()
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        message: "",
    })

    useEffect(() => {
        getExperience();
    }, [])

    async function getExperience() {
        try {
            const response = await axios.get(import.meta.env.VITE_BASE_URL + contact())
            if (response?.data?.success) {
                setContactsData(response?.data?.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const sendEmail = (e) => {
        e.preventDefault();
        if (formValues?.email?.length > 0 && formValues?.name?.length > 0 && formValues?.message?.length > 0) {


            emailjs.sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, formRef.current, import.meta.env.VITE_PUBLIC_KEY)
                .then((result) => {
                    toast.success("Notification sent!")
                    setFormValues({
                        email: "",
                        message: "",
                        name: ""
                    })
                }, (error) => {
                    toast.error("something went wrong...please try again later")
                });
        } else {
            toast.warn("Please fill all the values!")
        }
    };

    return (
        <>
            <div className="lg:py-36 pt-20 pb-10 lg:px-40 px-6">
                <ToastContainer />
                <div className="w-full lg:h-[35rem] rounded-2xl  bg-hero_dark absolute relative">
                    <div className="relative top-5 border-4 rounded-2xl flex justify-between items-center border-hero_highlight-dark -left-5 w-full h-full bg-[white]">
                        <div className="flex justify-between lg:flex-row flex-col items-center py-4 px-8 w-full">
                            <div className="lg:w-1/2 w-full text-left">
                                <h5 className="text-xl font-semibold mb-5 text-center lg:text-left">Drop Me a Message!</h5>
                                <p className="mb-5 text-sm lg:text-lg text-center lg:text-left">{contactsData?.contact_description}</p>
                                <div className='flex lg:justify-start justify-center items-center lg:mt-10 mt-5'>
                                    <div className=' flex justify-between items-center mx-2 self-end'>
                                        <a href={`tel:${contactsData?.contact_number}`} className='bg-hero_dark py-2 px-3 rounded text-w'><FontAwesomeIcon icon={faPhone} /></a>
                                    </div>
                                    <div className=' flex justify-between items-center mx-2 self-end'>
                                        <a href={`mailto:${contactsData?.contact_email}`} className='bg-hero_dark py-2 px-3 rounded text-w'><FontAwesomeIcon icon={faEnvelope} /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/2 w-full flex justify-end items-center mt-5 lg:mt-0">
                                <div className="bg-hero_dark rounded-xl lg:w-5/6 w-full p-4">
                                    <form ref={formRef} >
                                        <input type="text" name="from_name" id="" placeholder="Name" value={formValues?.name} onChange={(e) => setFormValues(prev => ({ ...prev, name: e?.target?.value }))} className="w-full p-1 rounded my-3 text_black" />
                                        <input type="text" name="from_email" value={formValues?.email} onChange={(e) => setFormValues(prev => ({ ...prev, email: e?.target?.value }))} id="" placeholder="Email" className="w-full p-1 rounded my-3 text_black" />
                                        <textarea name="message" value={formValues?.message} onChange={(e) => setFormValues(prev => ({ ...prev, message: e?.target?.value }))} id="" cols="30" rows="5" className='w-full p-1 rounded my-3  text_black' placeholder='Message..'></textarea>
                                        <div className='text-left text-w pb-3'>
                                            <button onClick={(e) => sendEmail(e)} className="bg-hero_actions-dark p-1 w-[6rem] rounded text-lg">Send</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}