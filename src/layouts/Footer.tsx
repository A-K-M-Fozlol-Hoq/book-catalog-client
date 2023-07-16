export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
    <div className="container mx-auto py-8 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="col-span-2">
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p>
          Explore our diverse online book catalog featuring captivating reads across genres. Discover hidden gems and bestsellers. Start reading today!
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Services</h3>
          <ul className="list-none">
            <li className="mb-2">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Books
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Add Your Books
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Add Wishlist
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p>
            Badda, Dhaka<br />
            Bangladesh<br />
            Phone: (+88) 01758-600731<br />
            Email: akmfozlolhoq@gmail.com
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-blue-400 hover:text-blue-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-blue-400 hover:text-blue-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-blue-400 hover:text-blue-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-600 mt-8 pt-6">
        <p className="text-sm text-gray-500">
          &copy; {year} Books Catalogue . All rights reserved. | Designed by{' '}
          <a
            href="https://portfolio-fozlol.web.app/"
            className="text-blue-400 hover:text-blue-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            A.K.M Fozlol Hoq
          </a>
        </p>
      </div>
    </div>
  </footer>
    );
}
