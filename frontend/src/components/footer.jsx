import wave from '../assets/wave.svg';
import "./navbar.css"

export default function Footer(){
    return(
        <div className="footer">
            <img src={wave} />
              <div className="content pb-30 text-white flex flex-row justify-center items-center">
                <div className="right min-w-2/5 items-end">
                    <h2 className="text-3xl font-serif">Join our News Letter</h2>
                    <p className='text-gray-200'>Read Online provide great reading services to its users building their satisfaction and trust. <br/>Join today to be a part</p>
                </div>
                <div className="left min-w-2/5 items-start">
                    <input type="email" placeholder='Enter your email' className='py-2 px-1.5 w-2/3 bg-white text-black focus:border-0 ' />
                    <button className='bg-amber-100 text-amber-700 px-7 py-2 rounded-2xl ml-2 hover:cursor-pointer'>Join</button>
                </div>
           </div>
        </div>

    );
}