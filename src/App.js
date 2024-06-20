// src/App.jsimport React, { useState } from 'react';

import React, { useState } from 'react';
import HtmlDialog from './HtmlDialog';
import actionsData from './actionsData'; // Assurez-vous que actionsData est exporté correctement d'un fichier séparé

// Composant pour la fenêtre de saisie
const VariantDialog = ({ onSubmit, onClose }) => {
  const [variantText, setVariantText] = useState('');

  const handleSubmit = () => {
    onSubmit(variantText);
    onClose();
  };

  return (
    <div className="dialog">
      <h2>Proposer plusieurs nouvelles variantes plus fluides:</h2>
      <textarea
        value={variantText}
        onChange={(e) => setVariantText(e.target.value)}
        rows="5"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Soumettre</button>
      <button onClick={onClose}>Fermer</button>
    </div>
  );
};

function App() {
  const [submittedText, setSubmittedText] = useState('');
  const [selectedActions, setSelectedActions] = useState([]);
  const [executedActions, setExecutedActions] = useState([]);
  const [showActions, setShowActions] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);
  const [variantDialogVisible, setVariantDialogVisible] = useState(false);
  const [actionResults, setActionResults] = useState({});

  const handleSubmit = (text) => {
    setSubmittedText(text);
    setShowActions(true);
    setDisplayResult(false);
    console.log('Texte soumis :', text);
  };

  const handleCheckboxChange = (e) => {
    const actionNo = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedActions([...selectedActions, actionNo]);
    } else {
      setSelectedActions(selectedActions.filter(no => no !== actionNo));
    }
  };

  const handleActionsSubmit = (e) => {
    e.preventDefault();
    setShowActions(false);
    setDisplayResult(true);
    console.log('Actions sélectionnées :', selectedActions);

    const newExecutedActions = [...executedActions];

    selectedActions.forEach(actionNo => {
      const action = actionsData.find(a => a.no === actionNo);
      if (action && action.fonction && functionsMap[action.fonction]) {
        // Exécuter la fonction correspondante
        functionsMap[action.fonction](submittedText);
      }
      newExecutedActions.push(actionNo);
    });

    setExecutedActions(newExecutedActions);
    setSelectedActions([]); // Réinitialiser les actions sélectionnées après soumission
  };

  const handleEndClick = () => {
    window.close();
  };

  const proposeVariants = (text) => {
    setVariantDialogVisible(true);
  };

  const handleVariantSubmit = (text) => {
    setActionResults(prevResults => ({
      ...prevResults,
      proposeVariants: text,
    }));
  };

  // Map des fonctions
  const functionsMap = {
    proposeVariants
  };

  return (
    <div className="App">
      <HtmlDialog onSubmit={handleSubmit} />
      {submittedText && (
        <div>
          <h2>Texte soumis :</h2>
          <pre>{submittedText}</pre>
        </div>
      )}
      {showActions && (
        <div>
          <h2>Actions disponibles :</h2>
          <form onSubmit={handleActionsSubmit}>
            {actionsData.map(action => {
              const isActionExecuted = executedActions.includes(action.no);
              const isFunctionExecuted = action.fonction && executedActions.some(no => actionsData.find(a => a.no === no && a.fonction === action.fonction));
              return (
                <div key={action.no}>
                  <label>
                    <input
                      type="checkbox"
                      value={action.no}
                      onChange={handleCheckboxChange}
                      disabled={isActionExecuted || isFunctionExecuted}
                    />
                    {action.action}
                  </label>
                </div>
              );
            })}
             <hr /> {/* Ligne en dessous du bouton */}

            <button type="submit"style={{ padding: '10px 20px', fontSize: '16px', margin: '10px 0' }}
            >Soumettre les actions</button>
          </form>
          <button onClick={handleEndClick} style={{ padding: '10px 20px', fontSize: '16px', margin: '10px 0' }}
          >END</button>
        </div>
      )}
      {displayResult && (
        <div>
          <h2>Actions choisies :</h2>
          <p>{submittedText}</p>
          <ol>
            {executedActions.map(actionNo => (
              <li key={actionNo}>
                {actionsData.find(action => action.no === actionNo).action}
                {actionsData.find(action => action.no === actionNo).fonction && (
                  <span>: {actionResults[actionsData.find(action => action.no === actionNo).fonction]}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
      {variantDialogVisible && (
        <VariantDialog
          onSubmit={handleVariantSubmit}
          onClose={() => setVariantDialogVisible(false)}
        />
      )}
    </div>
  );
}

export default App;




