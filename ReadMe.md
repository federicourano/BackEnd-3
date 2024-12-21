Backend 3

GET

/api/mocks/mockingpets - Genera 50 mascotas sin agregarlas a la base de datos.

![Foto](src/imgs/image-1.png)

/api/mocks/mockingusers - Genera 50 usuarios sin agregarlos a la base de datos

![Foto](src/imgs/image.png)

POST 

/api/mocks/generateData?users={cantidadDeseada}&pets={cantidadDeseada} - Genera e inserta datos inventados en la base de datos, especificamente usuarios y pets, se generan cuantos usuarios y pets se indiquen. En caso de no indicar, se generaran 50 aleatorios de users y 50 aleatorios de pets.

![Foto](src/imgs/image-2.png)

Base de datos despues de generar pets y users

![10 pets](src/imgs/image-3.png)

![15 users](src/imgs/image-4.png)

TEST

Para ejecutar los tests, correr el comando: npm test

Deberia aparecer esto si se ejecutaron correctamente

![image](https://github.com/user-attachments/assets/4a9c2996-b896-489e-9f72-3e640eeff5f3)

DOCKER

Proyecto Dockerizado. Link a la imagen de docker: https://hub.docker.com/r/fedeurano/docker_urano

Pullear el proyecto con el comando: docker pull fedeurano/docker_urano:ver1

![image](https://github.com/user-attachments/assets/e785b590-5482-4ac2-8c9e-abb90cc29405)

Luego correrlo con el siguiente comando:docker run -p 3080:3080 docker_urano 

![image](https://github.com/user-attachments/assets/b5bf2f5d-a847-4e3e-acfc-fe9e090ed873)

Para chequear que funciona, ir a: http://localhost:8080/api/users

![image](https://github.com/user-attachments/assets/8be80435-3c9e-461d-80d1-a8a426f8b50d)

SWAGGER

Documentancion subida en: http://localhost:8080/api-docs/

![image](https://github.com/user-attachments/assets/14e49b1a-11ce-4470-8621-58c18fedbfc8)




