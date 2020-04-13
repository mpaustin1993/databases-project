import { useStoreState } from 'easy-peasy';
import React from 'react';
import './Admin.css';

const AdminDashboardComponent = () => {
	const admin = useStoreState((state) => state.auth.user);
	console.log(admin);

	return (
		<div className="container-fluid">
			<div className="row no-gutter">
				<div className="d-none d-md-flex col-md-4 col-lg-6 bg-admin-dashboard"></div>
				<div className="col-md-8 col-lg-6">
					<div className="login d-flex align-items-center py-5">
						<div className="container">
							<div className="row">
								<div className="col-md-9 col-lg-8 mx-auto">
									<div className="welcome text-center">
										<h1>Welcome, {admin.username}.</h1>
										<h2>How can we help you today?</h2>
									</div>
									<div className="body text-center"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboardComponent;
