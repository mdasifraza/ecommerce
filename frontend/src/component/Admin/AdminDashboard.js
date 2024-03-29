import React, { useEffect } from 'react';
import './AdminDashboard.css';
import MetaData from '../Layout/MetaData';
import AdminSidebar from './AdminSidebar.js';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
// import { useAlert } from 'react-alert';
import { getAdminProduct } from '../../actions/productAction';
import { getAllOrders } from '../../actions/orderAction';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const AdminDashBoard = () => {

    const dispatch = useDispatch();
    // const alert = useAlert();

    const { products } = useSelector(state => state.products);
    const { orders } = useSelector(state => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);

    let outOfStock = 0;

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
    }, [dispatch]);

    let totalAmout = 0;
    orders && orders.forEach(order =>{
        totalAmout += order.totalPrice;
    });

    products &&
        products.forEach((item) => {
            if (item.stock === 0) {
                outOfStock += 1;
            }
        })

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [{
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(120, 18, 0)"],
            data: [0, totalAmout],
        }]
    }

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [{
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products.length - outOfStock],
        }]
    }

    return (
        <>
            <MetaData title="Admin Panel | Dashboard" />
            <div className="dashboard">
                <AdminSidebar />
                <div className="dashboardContainer">
                    <Typography component="h1">Dashboard</Typography>

                    <div className="dashboardSummary">
                        <div>
                            <p>Total Amount <br /> ₹{totalAmout}</p>
                        </div>
                        <div className="dashboardSummaryBox2">
                            <Link to="/admin/products">
                                <p>Product</p>
                                <p>{products && products.length}</p>
                            </Link>
                            <Link to="/admin/orders">
                                <p>Orders</p>
                                <p>{orders && orders.length}</p>
                            </Link>
                            <Link to="/admin/users">
                                <p>Users</p>
                                <p>{users && users.length}</p>
                            </Link>
                        </div>
                    </div>

                    <div className="lineChart">
                        <Line
                            data={lineState}
                        />
                    </div>
                    <div className="doughnutChart">
                        <Doughnut
                            data={doughnutState}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashBoard