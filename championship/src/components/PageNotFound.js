import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const PageNotFound = props => {
	return (
		<div id='id-pageNotFound'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-12'>
						<div className='error-template'>
							<h1>Oops!</h1>
							<h2>404 Not Found</h2>
							<div className='error-details'>
								Sorry, an error has occured, Requested page not
								found!
							</div>
							<div className='error-actions'>
								<Link
									to='/championship'
									className='btn btn-primary btn-lg'
								>
									<FontAwesomeIcon icon={faHome} />
									Volver al Inicio{' '}
								</Link>
								<a
									href='mailto:ignaciocabrera1224@gmail.com'
									className='btn btn-default btn-lg'
								>
									<FontAwesomeIcon icon={faEnvelope} />{' '}
									Contacta con Soporte{' '}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
