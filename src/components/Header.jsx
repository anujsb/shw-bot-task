const Header = () => {
  return (
    <div className=" bg-white m-4 rounded-xl w-full">
      <div className="sm:px-4 lg:px-16 sticky top-0 ">
        <div className="flex items-start p-4 gap-4">
            <div>
                logo
            </div>
            <div className="flex flex-col">
                <h1 className="font-semibold text-3xl">
                    company name 
                </h1>
                <p>
                bot app
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
