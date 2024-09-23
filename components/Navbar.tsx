import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="relative">
            <div className="bg-white">
                <div className="flex justify-between h-16 shadow items-center px-5 pt-1 md:px-10">
                    <div className="flex items-center space-x-8">
                        <a href="/">
                            <h1 className="flex items-center text-md cursor-pointer">
                                <Image
                                    src="static/img/programaIncluir_Colorido_FundoTransparente.svg"
                                    alt="Logo Incluir"
                                    title="Incluir"
                                    width={150}
                                    height={120}
                                />
                            </h1>
                        </a>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <Link
                            href="/emailTable"
                            className="bg-orange-400 px-5 py-3 rounded text-white hover:bg-orange-300 text-sm"
                        >Boletins Gerados</Link>
                    </div>
                </div>
            </div>

        </nav>
    );
}

export default Navbar;