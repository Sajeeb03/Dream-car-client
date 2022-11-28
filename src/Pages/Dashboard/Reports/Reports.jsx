import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const Reports = () => {
    const { user, logOut } = useContext(AuthContext);
    const { data: reports = [], isLoading, refetch } = useQuery({
        queryKey: ["reports"],
        queryFn: async () => {
            try {
                const res = await axios(`https://dream-car-server-sajeeb03.vercel.app/reports`, {
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                return res.data.data;
            } catch (error) {
                if (error.response.status) {
                    logOut();
                }
            }
        }
    })

    const handleDelete = async report => {
        try {
            const res = await axios.delete(`https://dream-car-server-sajeeb03.vercel.app/reports/${report.id}`, {
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            if (res.data.success) {
                toast.success(res.data.message)
                refetch();
            }
        } catch (error) {
            if (error.response.status) {
                logOut();
            }
        }
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <h3 className="text-3xl text-center font-bold my-3">Reports</h3>
            <div className="overflow-x-auto px-3">
                <table className="table w-full">
                    <thead className='w-full'>
                        <tr>
                            <th></th>
                            <th>Car Name</th>
                            <th>Sale Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {
                            reports.map((report, i) => <tr key={report._id} className="hover">
                                <th>{i + 1}</th>
                                <td>{report.name}</td>
                                <td>{report.sold ? <btn className="btn btn-xs btn-primary disabled">Sold</btn> : <btn className="btn btn-xs btn-primary">Available</btn>}</td>
                                <td><label onClick={() => handleDelete(report)} className='btn btn-xs btn-error'>Delete</label></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reports;