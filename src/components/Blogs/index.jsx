import BlogSection from "./blogSection";
import { useState } from "react";
import { useEffect } from "react";
import { blogs } from "../../../apiService";
import axios from "axios";
import Footer from "../Footer";

export default function Blog() {

    const [blogsData, setBlogsData] = useState([])
    useEffect(() => {
        getBlogs();
    }, [])

    async function getBlogs() {
        try {
            const response = await axios.get(import.meta.env.VITE_BASE_URL + blogs())
            if (response?.data?.success) {
                setBlogsData(response?.data?.data)
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="lg:py-40 pt-20 pb-10 lg:px-40 px-6">
                <h3 className="lg:text-2xl text-xl font-bold mb-8">My Blogs</h3>
                <p className="text-hero_text-dark lg:w-[90%] w-[100%] lg:text-md md:text-lg text-sm mb-16" >Embark on a journey through my thoughts and experiences. Join me in exploring diverse topics, sharing insights, and embracing the beauty of life. Welcome to my world of words</p>
                <div className=" grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-y-24 gap-y-10 justify-center items-center place-items-center rounded-3xl" >
                    {blogsData?.map((blog, idx) =>
                        <BlogSection
                            blogLink={blog?.blog_link}
                            idx={idx}
                            blogHeading={blog?.blog_name}
                            blogContent={blog?.blog_description}
                        />
                    )
                    }

                </div >
            </div>
            <Footer />
        </>
    )
}