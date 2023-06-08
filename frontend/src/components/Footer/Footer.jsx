import './Footer.scss'
export default function Footer(){
    return(
        <footer className='footer-container'>
            <ul className='footer'>
                <li>
                    <a className='footer-link' href='https://www.facebook.com/profile.php?id=100007642659276' target="_blank">Facebook</a>
                </li>
                <li>
                    <a className='footer-link' href='https://github.com/DZhivkovv' target="_blank">Github</a>
                </li>
                <li>
                    <a className='footer-link' href = "mailto: dobromirzhivkovv@gmail.com">Send me an email</a>
                </li>
            </ul>
        </footer>
    )
}