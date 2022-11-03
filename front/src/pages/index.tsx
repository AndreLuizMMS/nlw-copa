interface HomeProps {
  poolCount: number;
  gussesCount: number;
  usersCount: number;
}

import Image from 'next/image';
import AppPreviewImage from '../assets/preview-app.png';
import Logo from '../assets/logo.svg';
import UserPreview from '../assets/users-avatar.png';
import checkIcon from '../assets/icon.svg';
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');
  const [poolCreated, setPoolCreated] = useState('');

  async function createPool(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      });

      const { code } = response.data;
      await navigator.clipboard.writeText(code);

      //prettier-ignore
      setPoolCreated('Bolão criado com sucesso, \n o código foi copiado para a área de transferência 🚀 ! ');
      setPoolTitle('');
    } catch (err) {
      alert(`Falha ao criar o bolão`);
      throw new Error(err);
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center ">
      <main>
        <Image src={Logo} alt="Logo do nlw copa" />
        <h1 className=" text-white font-bold text-5xl mt-16 mb-10 leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>
        <div id="users-preview" className="flex items-center mb-16">
          <Image src={UserPreview} alt="preview de avatar" />
          <h2 className="text-2xl font-bold">
            <span className="text-green-600">+{props.usersCount} </span>
            <span className="text-white"> pessoas já estão usando</span>
          </h2>
        </div>
        <span className="text-blue-400">{poolCreated}</span>
        <form
          id="pool-create"
          className="flex gap-2  mb-4"
          onSubmit={createPool}
        >
          <input
            type="text"
            required
            value={poolTitle}
            onChange={event => setPoolTitle(event.target.value)}
            placeholder="Qual o nome do seu bolão"
            className="bg-[#202024] flex-1 text-white border-2 border-[#323238] rounded-md"
          />
          <button
            type="submit"
            className="bg-yellow-300 font-bold px-4 py-6 rounded"
          >
            CRIAR MEU BOLÃO
          </button>
        </form>
        <div className="mb-10">
          <span className="text-[#8D8D99] ">
            Após criar seu bolão, você receberá um código único que poderá usar
            para convidar outras pessoas 🚀
          </span>
        </div>
        <footer className="flex gap-16  border-t border-gray-700 pt-10">
          <div className="flex items-center gap-6 ">
            <div>
              <Image src={checkIcon} width={46} alt="check-icon" />
            </div>
            <div className="border-r border-gray-700 pr-24 py-3">
              <h2 className=" flex flex-col text-white text-lg ">
                <span className="text-2xl font-bold">+ {props.poolCount}</span>
                <span>Bolões criados </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6">
              <Image src={checkIcon} width={46} alt="check-icon" />
            </div>
            <div>
              <h2 className=" flex flex-col text-white text-lg ">
                <span className="text-2xl font-bold">+{props.gussesCount}</span>
                <span>Palpites enviados </span>
              </h2>
            </div>
          </div>
        </footer>
      </main>

      <Image
        src={AppPreviewImage}
        alt="preview da aplcação móvel"
        quality={100}
      />
    </div>
  );
}
export async function getStaticProps() {
  const [poolCountResponse, guessesCountResponse, usersCountResponse] =
    await Promise.all([
      api.get('pools/count'),
      api.get('guesses/count'),
      api.get('users/count')
    ]);

  return {
    props: {
      gussesCount: guessesCountResponse.data.count,
      poolCount: poolCountResponse.data.count,
      usersCount: usersCountResponse.data.count
    }
  };
}
