import axios from 'axios'
import { useState, useEffect } from 'react'
import { contact } from '../../../apiService'
import ImageKitWrapper from "../commonComponents/Imagekit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faHashnode, faLinkedin, faMedium } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom';

export default function Footer() {

    const [contactsData, setContactsData] = useState(null)
    const navigate = useNavigate()
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

    return (
        <div className="text-white top-0 left-0 w-full py-3 px-3 backdrop-blur-lg" style={{ zIndex: 22 }}>
            <hr className='border-2 border-gray-100' />
            <div className='flex justify-between items-center flex-row-reverse relative pb-8 w-full'>
                <div className="absolute lg:-left-7 lg:top-6 top-2 -left-3 w-[5.5rem] lg:w-auto" onClick={() => navigate('/')}>
                    <ImageKitWrapper path={"/portfolio_logo_colour.svg"} width={150} />
                </div>
                <div className='lg:mt-12 mt-3 flex justify-between items-center text-w'>

                    <div className=' flex justify-between items-center mx-2 self-end'>
                        <a href={contactsData?.contact_link[0]?.link_data} target='_blank' className='bg-hero_dark py-2 px-3 rounded'><FontAwesomeIcon icon={faLinkedin} /></a>
                    </div>
                    <div className=' flex justify-between items-center mx-2 self-end'>
                        <a href={contactsData?.contact_link[3]?.link_data} className='bg-hero_dark py-2 px-3 rounded'><FontAwesomeIcon icon={faGithub} /></a>
                    </div>
                    <div className=' flex justify-between items-center mx-2 self-end'>
                        <a href={contactsData?.contact_link[2]?.link_data} className='bg-hero_dark py-2 px-3 rounded'><FontAwesomeIcon icon={faHashnode} /></a>
                    </div>
                    <div className=' flex justify-between items-center mx-2 self-end'>
                        <a href={contactsData?.contact_link[1]?.link_data} className='bg-hero_dark py-2 px-3 rounded'><FontAwesomeIcon icon={faMedium} /></a>
                    </div>
                </div>
            </div>
        </div >
    )
}