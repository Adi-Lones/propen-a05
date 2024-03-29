import React from 'react'

interface TableProps {
    header: string[];
    children: React.ReactNode;
}

const Table = ({header, children}: TableProps) => {
  return (
    <table className='bg-[#fffefe] border-2 border-[#EDF0F7] rounded-xl w-full text-[#344054]'>
        <thead className='border-b border-[#cfcecf]'>
            <tr>
                {header.map((item, index) => (
                    <th key={index}  className='py-[18px] px-7 font-semibold text-sm'>{item}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </table>
  )
}

export default Table