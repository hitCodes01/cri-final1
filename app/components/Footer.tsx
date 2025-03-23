import "../globals.css"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <footer className="bg-cover bg-center py-10 text-center text-white" style={{ backgroundImage: "url('/footer.jpeg')" }}>
      <p className="mb-4">&copy; {new Date().getFullYear()} Climate Resilience Initiative. All rights reserved.</p>
      <div className="flex justify-center space-x-4">
        <a href="#" className="text-white hover:text-gray-300 transition duration-200">
          <FacebookIcon fontSize="large" />
        </a>
        <a href="#" className="text-white hover:text-gray-300 transition duration-200">
          <TwitterIcon fontSize="large" />
        </a>
        <a href="#" className="text-white hover:text-gray-300 transition duration-200">
          <LinkedInIcon fontSize="large" />
        </a>
        <a href="#" className="text-white hover:text-gray-300 transition duration-200">
          <InstagramIcon fontSize="large" />
        </a>
      </div>
      <p className="text-sm mt-6">Links to CRI’s partners and supporters</p>
    </footer>
  );
}