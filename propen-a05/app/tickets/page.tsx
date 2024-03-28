
"use client";
import { PrismaClient } from "@prisma/client";
import AddTicket from "./addTicket";
import DeleteTickets from "./deleteTickets";
import UpdateTickets from "./updateTickets";

import Table from "../components/ui/Table";
import TableStatus from "../components/ui/TableStatus";
import TableButton from "../components/ui/TableButton";
import { useRouter } from "next/navigation";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export const formatDateTime = (dateTime: Date | null): string => {
    return dateTime ? new Date(dateTime).toLocaleString() : "";
};


const getTickets = async () => {
    const res = await prisma.ticket.findMany({
        select: {
            id: true,
            title: true,
            customerId: true,
            productSalesId: true,
            category: true,
            description: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return res;
};


const Ticket = () => {
    const tickets = async () => await getTickets();
    const router = useRouter();
    const tableHeaders = ["No", "ID", "Last Updated", "Product", "Category", "Description", "Status", "Actions"];
    const tableDataDummies = [
        {
            "ID": "1",
            "lastUpdated": "2021-09-21",
            "product": "Product 1",
            "category": "Category 1",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porttitor arcu tempor cursus dignissim. Nulla facilisi. Integer erat felis, aliquet at euismod at, cursus ut velit. Quisque dictum, nisl in cursus bibendum, nisi tellus vulputate lacus, vel gravida nisi ex commodo nisl. Sed nec justo leo. Cras magna felis, luctus nec vestibulum in, sodales non dui. Quisque facilisis, lorem eu semper congue, mauris magna viverra mi, non eleifend lectus urna non erat.",
            "status": "Submitted"
        },
        {
            "ID": "2",
            "lastUpdated": "2021-09-21",
            "product": "Product 2",
            "category": "Category 2",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porttitor arcu tempor cursus dignissim. Nulla facilisi. Integer erat felis, aliquet at euismod at, cursus ut velit. Quisque dictum, nisl in cursus bibendum, nisi tellus vulputate lacus, vel gravida nisi ex commodo nisl. Sed nec justo leo. Cras magna felis, luctus nec vestibulum in, sodales non dui. Quisque facilisis, lorem eu semper congue, mauris magna viverra mi, non eleifend lectus urna non erat.",
            "status": "Reviewed"
        },
        {
            "ID": "3",
            "lastUpdated": "2021-09-21",
            "product": "Product 3",
            "category": "Category 3",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porttitor arcu tempor cursus dignissim. Nulla facilisi. Integer erat felis, aliquet at euismod at, cursus ut velit. Quisque dictum, nisl in cursus bibendum, nisi tellus vulputate lacus, vel gravida nisi ex commodo nisl. Sed nec justo leo. Cras magna felis, luctus nec vestibulum in, sodales non dui. Quisque facilisis, lorem eu semper congue, mauris magna viverra mi, non eleifend lectus urna non erat.",
            "status": "In Progress"
        },
        {
            "ID": "4",
            "lastUpdated": "2021-09-21",
            "product": "Product 4",
            "category": "Category 4",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porttitor arcu tempor cursus dignissim. Nulla facilisi. Integer erat felis, aliquet at euismod at, cursus ut velit. Quisque dictum, nisl in cursus bibendum, nisi tellus vulputate lacus, vel gravida nisi ex commodo nisl. Sed nec justo leo. Cras magna felis, luctus nec vestibulum in, sodales non dui. Quisque facilisis, lorem eu semper congue, mauris magna viverra mi, non eleifend lectus urna non erat.",
            "status": "Resolved"
        },
        {
            "ID": "5",
            "lastUpdated": "2021-09-21",
            "product": "Product 5",
            "category": "Category 5",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porttitor arcu tempor cursus dignissim. Nulla facilisi. Integer erat felis, aliquet at euismod at, cursus ut velit. Quisque dictum, nisl in cursus bibendum, nisi tellus vulputate lacus, vel gravida nisi ex commodo nisl. Sed nec justo leo. Cras magna felis, luctus nec vestibulum in, sodales non dui. Quisque facilisis, lorem eu semper congue, mauris magna viverra mi, non eleifend lectus urna non erat.",
            "status": "Closed"
        },
    ]

    return (
        <div>
            {/* <div className="mb-2">
                <AddTicket/>
            </div> */}

            <Table header={tableHeaders}>
                {tableDataDummies.map((data, index) => (
                    <tr key={index} className='text-center'>
                        <td className=' py-[18px]'>{index + 1}</td>
                        <td>{data.ID}</td>
                        <td>{formatDateTime(new Date(data.lastUpdated))}</td>
                        <td className='px-4'>{data.product}</td>
                        <td>{data.category}</td>
                        <td className='truncate max-w-40 px-4'>{data.description}</td>
                        <td className='px-4'><TableStatus status={data.status} /></td>
                        <td><TableButton label='Details' onClick={() => router.push(`/tickets/${data.ID}`)} borderColor='border-[#a16207]' textColor='text-[#a16207]' /></td>
                    </tr>
                ))}
            </Table>
        </div>
    );
};

export default Ticket;