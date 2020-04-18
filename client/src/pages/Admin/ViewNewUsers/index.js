import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form, ListGroup, Modal, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading';
import './ViewNewUsers.css';
import moment from 'moment';

const ViewNewUsers = () => {
	const formatPhoneNumber = (phoneNumberString) => {
		const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
		const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
		if (match) {
			const intlCode = match[1] ? '+1 ' : '';
			return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join(
				''
			);
		}
		return null;
	};

	const getNewPatients = useStoreActions(
		(actions) => actions.admin.getNewPatients
	);
	const avgAge = useStoreState((state) => state.admin.avgAge);
	const stateCounts = useStoreState((state) => state.admin.stateCounts);
	const newPatients = useStoreState((state) => state.admin.newPatients);

	const [show, setShow] = useState(false);

	useEffect(() => {
		getNewPatients({
			startDate: '1999-01-01',
			endDate: moment().format('YYYY-MM-DD'),
		});
	}, []);

	const [formData, setFormData] = useState({
		startDate: '',
		endDate: '',
	});

	const history = useHistory();

	const handleClose = (e) => {
		// e.preventDefault();
		setShow(false);
		history.push('/viewNewUsers');
	};

	const handleShow = () => {
		setShow(true);
	};

	const { startDate, endDate } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleShow();
		getNewPatients({
			startDate: moment(startDate).format('YYYY-MM-DD'),
			endDate: moment(endDate).format('YYYY-MM-DD'),
		});
	};

	return (
		<div className="container-fluid">
			<div className="row no-gutter">
				<div className="d-none d-md-flex col-md-4 col-lg-6 bg-admin-dashboard"></div>
				<div className="col-md-8 col-lg-6">
					<div className="login d-flex align-items-center py-5">
						<div className="container">
							<div className="row">
								<div className="col-md-9 col-lg-4 mx-auto">
									<h3 className="login-heading mb-4">
										View New Patients
									</h3>
									<form onSubmit={(e) => handleSubmit(e)}>
										<div className="form-group">
											<input
												type="date"
												placeholder="startDate Date"
												name="startDate"
												value={startDate}
												className="form-control"
												autoFocus
												onChange={(e) => onChange(e)}
												required
											/>
										</div>

										<div className="form-group">
											<input
												type="date"
												placeholder="endDate Date"
												name="endDate"
												value={endDate}
												className="form-control"
												autoFocus
												onChange={(e) => onChange(e)}
												required
											/>
										</div>

										<button
											id="modalActivate"
											type="submit"
											className="btn btn-sm btn-primary btn-register text-uppercase font-weight-bold mb-2"
											data-toggle="modal"
											data-target="#patientModal"
										>
											View
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				class="modal fade right"
				id="patientModal"
				tabindex="1"
				role="dialog"
				// aria-labelledby="exampleModalPreviewLabel"
				// aria-hidden="true"
			>
				<div
					class="modal-dialog-full-width modal-dialog momodel modal-fluid"
					role="document"
				>
					<div class="modal-content-full-width modal-content ">
						<div class="modal-header">
							<div class="modal-title">
								New Patient Information
							</div>
						</div>

						<div class="modal-body">
							<ListGroup horizontal>
								<b>Average Patient Age:</b>
								{avgAge.map((age, idx) => (
									<div class="list-group-item-custom">
										{age.avg_age.toPrecision(2)}
									</div>
								))}
								<b>Patient Location Counts:</b>
								{stateCounts.map((stateCount, idx) => (
									<div class="list-group-item-custom">
										<b>{stateCount.state}: </b> {stateCount.count}
									</div>
								))}
							</ListGroup>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Username</th>
										<th>Role</th>
										<th>Date Registered</th>
										<th>Id</th>
										<th>Name</th>
										<th>Email</th>
										<th>Phone Number</th>
										<th>Gender</th>
										<th>DOB</th>
										<th>Age</th>
									</tr>
								</thead>
								<tbody>
									{newPatients.map((patient, idx) => {
										return (
											<tr key={idx}>
												<td>{`${patient.username}`}</td>
												<td>{`${patient.role}`}</td>
												<td>
													{moment(patient.created_at).format(
														'MM/DD/YYYY'
													)}
												</td>
												<td>{`${patient.patient_id}`}</td>
												<td>{`${patient.patient_first_name} ${patient.patient_last_name}`}</td>
												<td>{`${patient.patient_email}`}</td>
												<td>
													{formatPhoneNumber(
														patient.patient_phone_number
													)}
												</td>
												<td>{`${patient.patient_gender}`}</td>
												<td>
													{moment(patient.patient_dob).format(
														'MM/DD/YYYY'
													)}
												</td>
												<td>{`${patient.age}`}</td>
												<td></td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewNewUsers;
