import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FiChevronRight } from 'react-icons/fi';
import githubIcon from '../../assets/github-icon.png';
import {
    Container,
    TitleContainer,
    Icon,
    Title,
    Input,
    Repositories,
} from './styles';

import api from '../../services/api';

const List = () => {
    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState([]);

    const handleAddRepository = async (e) => {
        e.preventDefault();
        try {
            const response = await api.get(`/repos/${newRepo}`)
            const repository = response.data;

            setRepositories([...repositories, repository])

            setNewRepo('');
        } catch {
            setNewRepo('');
            alert('Erro na busca por este repositório')
        }
    }

    return (
        <Container>
            <TitleContainer>
                <Icon src={githubIcon} />
                <Title>Github App</Title>
            </TitleContainer>

            <form onSubmit={handleAddRepository}>
                <Input value={newRepo}
                    onChange={e => setNewRepo(e.target.value)}
                    placeholder="Digite o nome do repositório.."
                />
            </form>

            {repositories.map(repository => {
                return (
                    <Repositories key={repository.full_name}>
                        <Link to={`/repository/${repository.full_name}`}>
                            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                            <div>
                                <strong>{repository.full_name}</strong>
                                <p>{repository.description}</p>
                            </div>

                            <FiChevronRight size={20} />
                        </Link>
                    </Repositories>
                )
            })}
        </Container>
    )
}

export default List;