import { useState } from "react";

function Tables({ result, tabHead }) {
    let data = result;
    let [outNumber, setOutNumber] = useState(5);
    let [order, setOrder] = useState([0, 1]);
    let [search, setSearch] = useState("");
    let [page, setPage] = useState([Math.floor(data.length / outNumber) + 1, 1]);
    data = filterOut(data, outNumber, order, search, page[1], page[0], setPage);
    return (<Table order={order} data={data} outNumber={outNumber} pageNumber={page[0]} pageNow={page[1]} handlePage={setPage} how={order[1]} onchange={setSearch} changeOrder={setOrder} changeOutPut={setOutNumber} hf={tabHead} />)
}


function Table({ changeOutPut, hf, data, changeOrder, how, onchange, handlePage, pageNumber, pageNow, outNumber, order }) {
    return (
        <div className="card mb-4">
            <div className="card-header">
                <i className="fas fa-table me-1"></i>
                DataTable Example
            </div>
            <div className="card-body">
                <OutOption onchangeSelect={changeOutPut} length={data[1].length} handlePage={handlePage} pageNow={pageNow} onChangeInput={onchange} />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            {hf.map((e, k) => <td key={k} className={"trIn tr-" + k} onClick={() => { changeOrder([k, how * -1]) }}>
                                <span className="col-10">{e}</span>
                                <div className={"haut" + ((order[0] == k && order[1] == 1) ? " hautA" : "")}></div>
                                <div className={"bas" + ((order[0] == k && order[1] == -1) ? " basA" : "")}></div>
                            </td>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data[0]}
                    </tbody>
                </table>
                <div className="row">
                    <p className="col-8">Showing {(outNumber * pageNow) - outNumber + 1} to {outNumber * pageNow > data[1].length ? data[1].length : outNumber * pageNow} of {data[1].length} entries</p>
                    <div className="col-4">
                        <div className="d-flex justify-content-end">
                            <Pagination number={pageNumber} handlePage={handlePage} pageNow={pageNow} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function Pagination({ number, handlePage, pageNow }) {
    let allButton = [];
    let a = pageNow <= 4 ? 1 : 4;
    a = number > 8 ? a : 1;
    let b = pageNow >= 5 ? number - 1 : number - 4;
    b = number > 8 ? b : number - 1;
    for (let i = a; i < b; i++) {
        allButton.push(
            <li onClick={() => handlePage([number, i + 1])}>
                <a href="#" className={i + 1 == pageNow ? "bg-primary" : ""} onClick={a => a.preventDefault()}>{i + 1}</a>
            </li>
        );
    }

    return (
        <nav className="dataTable-pagination">
            <ul>
                <NxtPrv differences={1} number={number} label="<" handlePage={handlePage} pageNow={pageNow} sum={-1} />
                <LiHandlePage value={1} handlePage={handlePage} pageNow={pageNow} number={number} equal={1} />
                <MoreLi pageNow={pageNow} number={number} n={1} />
                {allButton}
                <MoreLi pageNow={pageNow} number={number} n={2} />
                <LiHandlePage value={number} handlePage={handlePage} pageNow={pageNow} number={number} equal={number} />
                <NxtPrv differences={number} number={number} label=">" handlePage={handlePage} pageNow={pageNow} sum={1} />
            </ul>
        </nav>
    );
}

function MoreLi({ pageNow, number, n }) {
    if ((pageNow + 5 + pageNow / 2 > number && number > 8) && n == 1) {
        return (<li><a onClick={a => a.preventDefault()}>...</a></li>);
    } else if ((pageNow + 5 + pageNow / 2 < number && number > 8) && n == 2) {
        return (<li><a onClick={a => a.preventDefault()}>...</a></li>);
    } else {
        return "";
    }
}

function NxtPrv({ differences, label, handlePage, number, pageNow, sum }) {
    if (pageNow != differences) {
        return (<li onClick={() => handlePage([number, pageNow + sum])}>
            <a href="#" onClick={a => a.preventDefault()}>{label}</a>
        </li>);
    }
}

function LiHandlePage({ number, handlePage, value, pageNow, equal }) {
    return (<li onClick={() => handlePage([number, value])}>
        <a href="#" className={equal == pageNow ? "bg-primary" : ""} onClick={a => a.preventDefault()}>{value}</a>
    </li>);
}


function OutOption({ onchangeSelect, onChangeInput, handlePage, length }) {
    return <div className="row mb-2">
        <div className="col-1">
            <select className="form-select w-1" onChange={e => {
                let value = parseInt(e.target.value);
                onchangeSelect(parseInt(value));
                handlePage([Math.floor(length / value) + 1, 1]);
            }}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
            </select>
        </div>
        <div className="col-8">
            <p className="entries">entries per page</p>
        </div>
        <div className="col-3 d-flex justify-content-end">
            <input type="text" onChange={e => {
                onChangeInput(e.target.value);
            }} className="form-control" placeholder="Search..." />
        </div>
    </div>
}

function filterOut(data, numberOut, theOrder, toSearch, pageNow) {
    let data3 = filterSearch(toSearch, data);
    let data2 = filterPage(pageNow, filterOrder(theOrder, data3), numberOut).map((a, b) => {
        return (<tr key={b}>
            {
                a.map((c, d) => {
                    return (<td className={"td-" + c} key={b + "" + d}>{c}</td>);
                })
            }
        </tr>);
    })
    return [data2, data3];
}

function filterOrder([orderBy, how], data) {
    data = data.sort((a, b) => a[orderBy] > b[orderBy]);
    if (how == 1) {
        return data;
    } return data.reverse();
}

function filterPage(pageNow, data, outNumber) {
    return data.slice((outNumber * pageNow) - outNumber, outNumber * pageNow);
}


function filterSearch(toSearch, data) {
    if (toSearch.length == 0) {
        return data;
    }
    data = data.filter(a => a[0].toLowerCase().includes(toSearch.toLowerCase()));
    return data;
}
export default Tables;