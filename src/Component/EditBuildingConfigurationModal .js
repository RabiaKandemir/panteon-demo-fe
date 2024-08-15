import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditBuildingConfigurationModal = ({ configuration, onClose, onSave }) => {
    const [initialValues, setInitialValues] = useState({
        id: '',
        buildingType: '',
        buildingCost: '',
        constructionTime: ''
    });

    useEffect(() => {
        if (configuration) {
            setInitialValues({
                id: configuration.id || '',
                buildingType: configuration.buildingType || '',
                buildingCost: configuration.buildingCost || '',
                constructionTime: configuration.constructionTime || ''
            });
        }
    }, [configuration]);

    const validationSchema = Yup.object().shape({
        buildingCost: Yup.number()
            .positive('Building Cost must be greater than zero')
            .required('Building Cost is required'),
        constructionTime: Yup.number()
            .min(30, 'Construction Time must be at least 30 seconds')
            .max(1800, 'Construction Time must be less than or equal to 1800 seconds')
            .required('Construction Time is required')
    });

    const handleSubmit = (values) => {
        onSave(values);
    };

    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Configuration</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                        >
                            {() => (
                                <Form>
                                    <Field type="hidden" name="id" />
                                    <div className="mb-3">
                                        <label className="form-label">Building Type</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="buildingType"
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Building Cost</label>
                                        <Field
                                            type="number"
                                            className="form-control"
                                            name="buildingCost"
                                            required
                                        />
                                        <ErrorMessage name="buildingCost" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Construction Time</label>
                                        <Field
                                            type="number"
                                            className="form-control"
                                            name="constructionTime"
                                            required
                                        />
                                        <ErrorMessage name="constructionTime" component="div" className="text-danger" />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBuildingConfigurationModal;
