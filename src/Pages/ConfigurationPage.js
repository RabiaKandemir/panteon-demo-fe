
import React, { useState, useEffect } from 'react';
import {
    getBuildingConfigurations,
    createBuildingConfiguration,
    updateBuildingConfiguration,
    deleteBuildingConfiguration
} from '../Services/ConfigurationService';
import AddBuildingConfigurationModal from '../Component/AddBuildingConfigurationModal ';
import EditBuildingConfigurationModal from '../Component/EditBuildingConfigurationModal ';

const BuildingConfigurationPage = () => {
    const [configurations, setConfigurations] = useState([]);
    const [selectedConfiguration, setSelectedConfiguration] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchConfigurations();
    }, []);

    const fetchConfigurations = async () => {
        try {
            const response = await getBuildingConfigurations();
            setConfigurations(response.data);
        } catch (error) {
            console.error('Error fetching configurations:', error);
        }
    };

    const handleAdd = () => {
        setSelectedConfiguration(null);
        setIsAdding(true);
        setModalVisible(true);
    };

    const handleEdit = (configuration) => {
        setSelectedConfiguration(configuration);
        setIsAdding(false);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteBuildingConfiguration(id);
            fetchConfigurations();
        } catch (error) {
            console.error('Error deleting configuration:', error);
        }
    };

    const handleSave = async (configuration) => {
        try {
            if (configuration.id) {
                await updateBuildingConfiguration(configuration.id, configuration);
            } else {
                await createBuildingConfiguration(configuration);
            }
            setModalVisible(false);
            fetchConfigurations();
        } catch (error) {
            console.error('Error saving configuration:', error);
        }
    };

    return (
        <div className="container">
            <h1 className='my-2'>Building Configurations</h1>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-primary my-4 text-right" onClick={handleAdd}>Add New Configuration</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Building Type</th>
                        <th>Building Cost</th>
                        <th>Construction Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {configurations.map(configuration => (
                        <tr key={configuration.id}>
                            <td>{configuration.buildingType}</td>
                            <td>{configuration.buildingCost}</td>
                            <td>{configuration.constructionTime}</td>
                            <td>
                                <button className="btn btn-warning" >Edit</button>
                                <button className="btn btn-danger mx-3">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalVisible && isAdding && (
                <AddBuildingConfigurationModal
                    onClose={() => setModalVisible(false)}
                    onSave={handleSave}
                    existingBuildingTypes={configurations.map(config => config.buildingType)}
                />
            )}
            {modalVisible && !isAdding && (
                <EditBuildingConfigurationModal
                    configuration={selectedConfiguration}
                    onClose={() => setModalVisible(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default BuildingConfigurationPage;
