"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

import { cn } from '@/lib/utils';
import Table from '../components/ui/Table'
import TableStatus from '../components/ui/TableStatus';

import TrackerGroup from './components/TrackerGroup';


const StatusTrackerPage = () => {
    const tableHeaders = ["ID", "Date", "Product", "Brand", "Category", "Description", "Status"];
    const dummyData = {
        "ID": "1",
        "Date": "2021-09-21",
        "Product": "Product 1",
        "Brand": "Brand 1",
        "Category": "Category 1",
        "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porttitor arcu tempor cursus dignissim. Nulla facilisi. Integer erat felis, aliquet at euismod at, cursus ut velit. Quisque dictum, nisl in cursus bibendum, nisi tellus vulputate lacus, vel gravida nisi ex commodo nisl. Sed nec justo leo. Cras magna felis, luctus nec vestibulum in, sodales non dui. Quisque facilisis, lorem eu semper congue, mauris magna viverra mi, non eleifend lectus urna non erat.",
        "Statuses": [
            {
                "status": "Submitted",
                "date": "2021-09-21",
            },
            {
                "status": "Reviews",
                "date": "2021-09-21",
            },
            {
                "status": "In Progress",
                "date": "2021-09-21",
            },
        ],
        "review": "",
    };
    const [reviewPopup, setReviewPopup] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState<number | null>(null);
    const [likes, setLikes] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<string>("");

    function handleLikes(e: React.ChangeEvent<HTMLInputElement>) {
        const likedValue = e.target.value;
        const index = likes.indexOf(likedValue);
        if (index !== -1) {
            const updatedLikes = [...likes];
            updatedLikes.splice(index, 1);
            setLikes(updatedLikes);
        } else {
            setLikes([...likes, likedValue]);
        }
    }

    function handleReviewSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(rating);
        console.log(likes);
        console.log(feedback);
    }

    return (
        <div className='bg-white w-full min-h-[100vh] flex flex-col items-center justify-center relative text-[#344054] py-10 sm:py-0'>
            {/* Review Popup */}
            {
                reviewPopup && (
                    <div className="absolute bg-black/70 inset-0 flex items-center justify-center" onClick={() => setReviewPopup(false)}>
                        <form action="POST" className="bg-white rounded-lg p-5 space-y-4 sm:space-y-8 max-w-xs sm:max-w-none" onSubmit={handleReviewSubmit} onClick={e => e.stopPropagation()}>
                            <div className="flex justify-between items-center font-semibold text-xl">
                                <h1>Give us a review</h1>
                                <button onClick={() => setReviewPopup(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <h2 className='font-medium mb-2'>How would you rate our experience?</h2>
                                <div className="flex space-x-2">
                                    {[...Array(5)].map((star, index) => {
                                        const currentRating = index + 1;
                                        return (
                                            <label key={index}>
                                                <input type="button" name='rating' value={currentRating} onClick={() => setRating(currentRating)} className='hidden' />
                                                <FaStar className='cursor-pointer' size={40} color={currentRating <= (hover || rating) ? "#3D3FDF" : ""} onMouseEnter={() => setHover(currentRating)} onMouseLeave={() => setHover(null)} />
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className='space-y-2 border-t border-b border-[#E4E7EC] py-4'>
                                <h2 className='font-medium mb-2'>What did you like?</h2>
                                <label className='space-x-3 flex items-center'>
                                    <input type="checkbox" onChange={e => handleLikes(e)} className='w-5 h-5 cursor-pointer' value="Customer service attitude" />
                                    <span>Customer service attitude</span>
                                </label>
                                <label className='space-x-3 flex items-center'>
                                    <input type="checkbox" onChange={e => handleLikes(e)} className='w-5 h-5 cursor-pointer' value="Speed of service" />
                                    <span>Speed of service</span>
                                </label>
                                <label className='space-x-3 flex items-center'>
                                    <input type="checkbox" onChange={e => handleLikes(e)} className='w-5 h-5 cursor-pointer' value="Outcome of the complaint" />
                                    <span>Outcome of the complaint</span>
                                </label>
                                <label className='space-x-3 flex items-center'>
                                    <input type="checkbox" onChange={e => handleLikes(e)} className='w-5 h-5 cursor-pointer' value="Efficiency of the process" />
                                    <span>Efficiency of the process</span>
                                </label>
                                <label className='space-x-3 flex items-center'>
                                    <input type="checkbox" onChange={e => handleLikes(e)} className='w-5 h-5 cursor-pointer' value="Communication quality" />
                                    <span>Communication quality</span>
                                </label>
                            </div>
                            <div>
                                <h2 className='font-medium mb-2'>Share your feedback (optional)</h2>
                                <textarea name="" cols={45} rows={4} className='bg-white border p-3 rounded-lg max-w-60 sm:max-w-none' placeholder="Drop your comments here, we're all ears!" onChange={e => setFeedback(e.target.value)}></textarea>
                            </div>
                            <button className='flex py-2 rounded-lg items-center font-medium w-full justify-center bg-[#3D3FDF] text-white' type='submit'>Submit</button>
                        </form>
                    </div>
                )
            }
            {/* Tracker Section */}
            <TrackerGroup status={dummyData.Statuses} />
            {/* Table Section */}
            <h3 className='text-center text-[#344054] mt-14 text-wrap px-10 sm:px-0'>We're actively working on your issue. Check the tracker for updates. Thank you for your patience!
                In Progress
            </h3>
            <div className='mt-4 w-full px-4 sm:px-20 overflow-x-scroll'>
                <Table header={tableHeaders} headerColor='bg-[#f2f5f6]'>
                    <tr className='text-center'>
                        <td>{dummyData.ID}</td>
                        <td>{dummyData.Date}</td>
                        <td>{dummyData.Product}</td>
                        <td>{dummyData.Brand}</td>
                        <td>{dummyData.Category}</td>
                        <td className='py-4 max-w-40 text-justify'>{dummyData.Description}</td>
                        <td className='px-4'><TableStatus status={dummyData.Statuses[dummyData.Statuses.length - 1].status} /></td>
                    </tr>
                </Table>
            </div>
            <div className='my-4'>
                <Image src={'/rafiki.svg'} width={268} height={200} alt='Tracker Logo' />
            </div>
            <div className='max-w-60 w-full'>
                <button className={cn("flex py-4 px-5 rounded-lg items-center font-medium w-full justify-center", dummyData.review ? "bg-[#E4E7EC] text-[#98A2B3]" : "bg-[#3D3FDF] text-white")} disabled={dummyData.review ? true : false}
                    onClick={() => setReviewPopup(true)}
                >
                    Give us a review
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    )
}

export default StatusTrackerPage