import Head from 'next/head'
import Layout from '../components/layout'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Link from 'next/link'
import config from '../config/config'

export default function Login({ token }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const login = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/login`,
                { username, password },
                { withCredentials: true })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.status + ': ' + result.data.user.username)
        }
        catch (e) {
            console.log('error: ', JSON.stringify(e.response))
            setStatus(JSON.stringify(e.response).substring(0, 80) + "...")
        }
    }

    const loginForm = () => (
        <div className={styles.gridContainer}>
            <div>
                Username:
            </div>
            <div>
                <input type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                Password:
            </div>
            <div>
                <input type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
        </div>
    )

    return (
        <Layout>
            <Head>
                <title class = "text-stone-800 text-xl">Login</title>
            </Head>
            <div className={styles.container}>
                <h1>Login</h1>
                
                
                <br/>
                <div>
                    Status:  {status}
                </div>
                <br />
                {loginForm()}
                <div>
                    <Link href="/register"><a className="bg-lime-200 hover:bg-blue-700 text-amber-800 font-bold py-2 px-4 rounded-full "> Register </a></Link>
                    <button onClick={login} className="bg-lime-200 hover:bg-blue-700 text-amber-800 font-bold py-2 px-4 rounded-full ">Login</button>
                    <Link href="/profile"><a className="bg-lime-200 hover:bg-blue-700 text-amber-800 font-bold py-2 px-4 rounded-full "> Home </a></Link>
                </div>
            </div>
        </Layout>
        

    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
