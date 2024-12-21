import app from "../app.js"
import { MongoDB } from "../config/database.js"
import request from "supertest"
import { expect } from "chai"
import { adoptionsService, petsService, usersService } from "../services/index.js"

describe("Adoptions API, tests de CRUD", () => {
    let userId, petId, adoptionId;

    before(async () => {
        await MongoDB();

        const user = await usersService.create({
            first_name: "Fede",
            last_name: "Urano",
            email: "example@example.com",
            password: "XXXXXXXXXXXX"
        });
        userId = user._id;

        const pet = await petsService.create({
            name: "oliver",
            specie: "cat",
            adopted: "false"
        });
        petId = pet._id;
    });

    after(async () =>{
        await usersService.delete(userId);
        await petsService.delete(petId);
        if (adoptionId) await adoptionsService.delete(adoptionId);
    });

    describe("GET /api/adoptions", () => {
        it("Devuelve todas las adopciones", async () => {
            const res = await request(app).get("/api/adoptions");
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal("success");
            expect(res.body.payload).to.be.an("array");
        });
    });

    describe("GET /api/adoptions/:aid", () => {
        it("Devuelve una adopcion por su ID", async () => {
            const adoption = await adoptionsService.create({
                owner: userId,
                pet: petId,
            });
            adoptionId = adoption._id;

            const res = await request(app).get(`/api/adoptions/${adoptionId}`);
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal("success");
            expect(res.body.payload).to.have.property("_id", adoptionId.toString());
        });
    });

    describe("POST /api/adoptions/:uid/:pid", () => {
        it("Devuelve una adopción nueva", async () => {
            const res = await request(app).post(`/api/adoptions/${userId}/${petId}`);
            console.log(`Adopcion de ${userId}, mascota ${petId} `); 
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal("success");
            expect(res.body.message).to.equal("Pet adopted");
    
            const user = await usersService.getUserById(userId);
            const petIds = user.pets.map(pet => pet._id.toString());
            expect(petIds).to.include(petId.toString());
            const pet = await petsService.getPetById(petId);
            expect(pet.adopted).to.be.true;
            console.log("Pet owner after adoption:", pet.owner);
            expect(pet.owner.toString()).to.equal(userId.toString());
        });
    
        it("Retornar error 404 si no se encuentra el usuario", async () => {
            const res = await request(app).post(
                `/api/adoptions/1114d19258d4903adddca664/${petId}`
            );
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal("error");
            expect(res.body.error).to.equal("user Not found");
        });
    
        it("Retorna error 404 si no se encuentra la mascota", async () => {
            const res = await request(app).post(
                `/api/adoptions/${userId}/1114d19258d4903adddca664`
            );
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal("error");
            expect(res.body.error).to.equal("Pet not found");
        });
    
        it("Retorna error 400 si la mascota ya fue adoptada", async () => {
            await petsService.update(petId, { adopted: true, owner: userId });
            const res = await request(app).post(`/api/adoptions/${userId}/${petId}`);
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal("error");
            expect(res.body.error).to.equal("Pet is already adopted");
        });
    });
});