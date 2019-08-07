import React, { Component } from 'react';

class Stadistics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tab: 'positions'
        }
    }

    setTab = ({ target: { id } }) => {
        this.setState({ tab: id });
    }

    render() {

        const { tab } = this.state;

        return (
            <div className='col-12 mt-5'>
                <h4>Estadísticas</h4>

                <div className='col-12'>
                    <ul className="nav nav-tabs mt-3">
                        <li className={tab === 'positions' ? 'element-active' : ''}><span className='btn btn-link' id='positions' onClick={this.setTab}>Posiciones</span></li>
                        <li className={tab === 'scorers' ? 'element-active' : ''}><span className='btn btn-link' id='scorers' onClick={this.setTab}>Goleadores</span></li>
                        <li className={tab === 'fairPlay' ? 'element-active' : ''}><span className='btn btn-link' id='fairPlay' onClick={this.setTab}>Fair play</span></li>
                    </ul>

                    <div className="tab-content mt-2">
                        {
                            tab === 'positions' && (
                                <div className='mt-3'>
                                    <h5>Posiciones</h5>
                                    <table className='mt-1 table table-striped'>
                                        <thead>
                                            <tr>
                                                <th scope="col">Equipos</th>
                                                <th scope="col">Puntos</th>
                                                <th scope="col">Goles a favor</th>
                                                <th scope="col">Goles en contra</th>
                                                <th scope="col">Diferencia de goles</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                        {
                            tab === 'scorers' && (
                                <div className='mt-3 '>
                                    <h5>Scorers</h5>
                                    <table className='mt-1 table table-striped'>
                                        <thead>
                                            <tr>
                                                <th scope="col">Nombre</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                        {
                            tab === 'fairPlay' && (
                                <div className='mt-3'>
                                    <h5>Fair Play</h5>
                                    <table className='mt-1 table table-striped'>
                                        <thead>
                                            <tr>
                                                <th scope="col">Equipo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Stadistics;