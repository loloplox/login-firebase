import { useState } from 'react';
import { Stack, Container, Form, Button } from 'react-bootstrap';


import firebaseApp from '../credenciales';
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithRedirect,
    GoogleAuthProvider 
} from 'firebase/auth';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();


export const Logueo = () => {

    const [estaRegistrandose, setEstaRegistrandose] = useState(true);

    async function submitHandler(e) {
        e.preventDefault();
        const correo = e.target.formBasicEmail.value;
        const contra = e.target.formBasicPassword.value

        if (estaRegistrandose) {
            await createUserWithEmailAndPassword(auth, correo, contra);
        } else {
            signInWithEmailAndPassword(auth, correo, contra);
        }
    }

    return (
        <div>
            <Container>
                <Stack gap={3}>
                    <h1>{ estaRegistrandose ? 'Registrate' : 'Inicia Sesion' }</h1>
                    <Form onSubmit={ submitHandler }>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="dark" className='dark' type="submit">
                            { estaRegistrandose ? 'Registrate' : 'Inicia Sesion' }
                        </Button>
                    </Form>

                    <Button variant="primary" type="submit" style={{width: '300px'}} onClick={() => {
                        signInWithRedirect(auth, googleProvider)
                    }}>
                            Iniciar con google
                    </Button>

                    <Button variant="primary" onClick={() => setEstaRegistrandose(!estaRegistrandose)} style={{width: '300px'}}>
                            {estaRegistrandose ? '¿Ya tienes cuenta? Inicia sesion' : '¿No tienes cuenta? Registrate'}
                    </Button>

                </Stack>
            </Container>
        </div>
    );
}