import { useState } from "react";
import result from "./result.json";
import Tables from "./Tables";
const tabHead = ["Name", "Position", "Office", "Age", "Start Date", "Salary"];

function App() {
    let [entries, changeEntries] = useState(5);
    let [order, changeOrder] = useState([0, 1]);
    return <>
        <NavBar />
        <div id="layoutSidenav">
            <NavSide>
                <div className="nav">
                    <HeadingText title="Core" />
                    <SimpleLink href="index.html" icon="fa-tachometer-alt" value="Dashboard" />
                    <HeadingText title="Interface" />
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Layouts
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <a className="nav-link" href="layout-static.html">Static Navigation</a>
                            <a className="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                        </nav>
                    </div>
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                        <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                        Pages
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                Authentication
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <SideNavMenu menu={{ "Login": "login.html", "Register": "register.html", "Forgot Password": "password.html" }} />
                            </div>
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                Error
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link" href="401.html">401 Page</a>
                                    <a className="nav-link" href="404.html">404 Page</a>
                                    <a className="nav-link" href="500.html">500 Page</a>
                                </nav>
                                <SideNavMenu menu={{ "401 Page": "401.html", "404 Page": "404.html", "500 Page": "500.html" }} />
                            </div>
                        </nav>
                    </div>
                    <HeadingText title="Addons" />
                    <SimpleLink href="charts.html" icon="fa-chart-area" value="Charts" />
                    <SimpleLink href="tables.html" icon="fa-table" value="Tables" />
                </div>
            </NavSide>
            <NavSideContent>
                <CardBody>
                    DataTables is a third party plugin that is used to generate the demo table below. For
                    more information about DataTables, please visit the
                    <a target="_blank" href="https://datatables.net/">official DataTables documentation</a>
                    .
                </CardBody>
                <Tables tabHead={tabHead} result={result} />
            </NavSideContent>
        </div>
    </>
}


function NavBar() {
    return <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand ps-3" href="index.html">Start Bootstrap</a>
        <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
                <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
            </div>
        </form>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#!">Settings</a></li>
                    <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#!">Logout</a></li>
                </ul>
            </li>
        </ul>
    </nav>
}

function HeadingText({ title }) {
    return <div className="sb-sidenav-menu-heading">{title}</div>;
}


function NavSide({ children }) {
    return <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                {children}
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                <i className="bi bi-app"></i> Start Bootstrap
            </div>
        </nav>
    </div>
}


function SimpleLink({ href, icon, value }) {
    return <a className="nav-link" href={href}>
        <div className="sb-nav-link-icon"><i className={"fas " + icon}></i></div>
        {value}
    </a>;
}

function SideNavMenu({ menu }) {
    let res = [];
    for (let i in menu) {
        res.push(<a className="nav-link" href={menu[i]}>{i}</a>);
    }
    return <nav className="sb-sidenav-menu-nested nav">
        {res};
    </nav>
}



function NavSideContent({ children }) {
    return <div id="layoutSidenav_content">
        <main>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Tables</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li className="breadcrumb-item active">Tables</li>
                </ol>
                {children}
            </div>
        </main>
        <Footer />
    </div>;
}


function CardBody({ children }) {
    return (<div className="card mb-4">
        <div className="card-body">
            {children}
        </div>
    </div>);
}

function Footer() {
    return <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright &copy; Your Website 2022</div>
                <div>
                    <a href="#">Privacy Policy</a>
                    &middot;
                    <a href="#">Terms &amp; Conditions</a>
                </div>
            </div>
        </div>
    </footer>
}




export default App;