"use client";

import React, { useState } from 'react';
import { TextField } from '@ui/atoms/Inputs/TextField/TextField';
import { Button } from '@ui/atoms/Button/Button';
import { Gift, ImagePlus, SendIcon } from 'lucide-react';
import { createPublication } from '../../services/publishService';

const FormPublish: React.FC = () => {
  const [title, setTitle] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const data = await createPublication({ title, problem, solution, advice });
      console.log('Publication created:', data);
      // Optionnel : réinitialiser le formulaire après succès
      setTitle('');
      setProblem('');
      setSolution('');
      setAdvice('');
    } catch (err) {
      setError('Erreur lors de la création de la publication');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Champ Title */}
      <TextField
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Entrez le titre"
      />
      {/* Champ Problem */}
      <TextField
        label="Problem"
        value={problem}
        onChange={e => setProblem(e.target.value)}
        placeholder="Décrivez le problème"
      />
      {/* Champ Solution (Optionnel) */}
      <TextField
        label="Solution (optionnel)"
        value={solution}
        onChange={e => setSolution(e.target.value)}
        placeholder="Proposez une solution"
      />
      {/* Champ Advice */}
      <TextField
        label="Advice"
        value={advice}
        onChange={e => setAdvice(e.target.value)}
        placeholder="Donnez votre conseil"
      />
      
      {/* Affichage d'éventuelles erreurs */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {/* Boutons d'actions */}
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
      <Button type="submit"  label={<ImagePlus/>} variant='ghost'>
      </Button>

        <Button type="button" label={<Gift/>} variant='ghost'  onClick={() => {/* logique pour ajouter un GIF */}}>
        </Button>
        <Button type="submit"  label={<SendIcon/>} variant='ghost'>
        </Button>
      </div>
    </form>
  );
};

export default FormPublish;
