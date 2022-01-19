import firebaseApp from "../credenciales";
import { getAuth, signOut } from 'firebase/auth';
import { Button, Container } from "react-bootstrap";

const auth = getAuth(firebaseApp);


export const Home = () => {
    return (
        
        <Container>
            <h4>
                Hola, Session Iniciada
            </h4>
            <Button variant="danger" onClick={() => signOut(auth)}>
                Cerrar Sesion
            </Button>

        </Container>

    );
};
