// controllers/client.controller.js
import clientService from "../services/clients.service.js";
import express from "express";


const clientController = {

    // Get all clients
    getAllClients : async (req, res, next) => {
        try {
            const clients = await clientService.getAllClients();
            res.status(200).json({
                success: true,
                count: clients.length,
                data: clients,
            });
        } catch (error) {
            next(error);
        }
    },

    // Get single client
    getClientById : async (req, res, next) => {
        try {
            const client = await clientService.getClientById(req.params.id);
            if (!client) {
                return res.status(404).json({
                    success: false,
                    message: "Client not found",
                });
            }
            res.status(200).json({
                success: true,
                data: client,
            });
        } catch (error) {
            next(error);
        }
    },

    // Create new client
    createClient : async (req, res, next) => {
        try {
            const client = await clientService.createClient(req.body);
            res.status(201).json({
                success: true,
                data: client,
            });
        } catch (error) {
            next(error);
        }
    },

    // Update client
    updateClient : async (req, res, next) => {
        try {
            const client = await clientService.updateClient(req.params.id, req.body);
            if (!client) {
                return res.status(404).json({
                    success: false,
                    message: "Client not found",
                });
            }
            res.status(200).json({
                success: true,
                data: client,
            });
        } catch (error) {
            next(error);
        }
    },

    // Delete client
    deleteClient : async (req, res, next) => {
        try {
            const result = await clientService.deleteClient(req.params.id);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: "Client not found",
                });
            }
            res.status(200).json({
                success: true,
                data: {},
            });
        } catch (error) {
            next(error);
        }
    },
};

export default  clientController;