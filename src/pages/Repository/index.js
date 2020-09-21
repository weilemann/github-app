import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import githubIcon from '../../assets/github-icon.png';
import { FiChevronsLeft, FiChevronRight } from 'react-icons/fi';
import {
    Header,
    RepositoryInfo,
    Issues,
} from './styles';

import api from '../../services/api';

const Repository = () => {
    const [repository, setRepository] = useState(null);
    const [issues, setIssues] = useState([]);
    const [showIssues, setShowIssues] = useState(true);

    const { params } = useRouteMatch();

    useEffect(() => {
        const loadData = async () => {
            api.get(`/repos/${params.repository}`).then(response => {
                setRepository(response.data)
            });
            api.get(`/repos/${params.repository}/issues`).then(response => {
                setIssues(response.data)
            });
        }

        loadData();
    }, [params.repository])

    const handleClick = () => {
        setShowIssues(!showIssues)
    }

    return (
        <>
            <Header>
                <img src={githubIcon} alt='Github Icon' />
                <Link to='/'>
                    <FiChevronsLeft size={20} />
                    Voltar
                </Link>
            </Header>

            {repository && (
                <RepositoryInfo>
                    <header>
                        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>

                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues abertos</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}
            <button onClick={handleClick}>{showIssues ? 'Hide Issue' : 'Unhide Issues'}</button>
            {showIssues ? 
                <Issues>
                {issues.map((issue) => {
                    return (
                        <a href={issue.html_url} key={issue.id}>
                            <div>
                                <strong>{issue.title}</strong>
                                <p>{issue.user.login}</p>
                            </div>

                            <FiChevronRight size={20} />
                        </a>
                    )
                })}
                </Issues> : <></>   
        }
            
        </>
    )
}

export default Repository;