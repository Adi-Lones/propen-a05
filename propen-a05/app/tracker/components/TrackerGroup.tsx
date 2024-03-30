import React, { useEffect, useState } from 'react'

import TrackerIcon from '@/app/components/ui/TrackerIcon'
import { cn } from '@/lib/utils';

enum TrackerStatus {
    "Submitted" = 1,
    "Reviewed" = 2,
    "In Progress" = 3,
    "Resolved" = 4,
    "Closed" = 5,
}

interface TrackerGroupProps {
    status: { status: string, date: string }[];
}

const trackerIconsData = [
    {
        label: 'Submitted', icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
        </svg>)
    },
    {
        label: 'Reviewed', icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>)
    },
    {
        label: 'In Progress', icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
        </svg>)
    },
    {
        label: 'Resolved', icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>)
    },
    {
        label: 'Closed', icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>)
    },
];

const TrackerGroup = ({ status }: TrackerGroupProps) => {

    return (
        <>
            <div className='items-center hidden sm:flex'>
                {trackerIconsData.map(({ label, icon }, index) => (
                    <React.Fragment key={index}>
                        <TrackerIcon
                            date='10/01/2024 10:13'
                            icon={icon}
                            label={label}
                            isActive={TrackerStatus[label as keyof typeof TrackerStatus] <= status.length}
                        />
                        {index < trackerIconsData.length - 1 && (
                            <hr className={cn('h-1 w-[130px] mb-16 rounded-full', TrackerStatus[label as keyof typeof TrackerStatus] < status.length ? "bg-[#3D3FDF]" : "bg-[#98A2B3]")} />
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div className='sm:hidden'>
                <TrackerIcon
                    date='10/01/2024 10:13'
                    icon={trackerIconsData[status.length - 1].icon}
                    label={trackerIconsData[status.length - 1].label}
                    isActive={true} />
            </div>
        </>
    );
}

export default TrackerGroup