import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useLocalStorage } from '../applicationState/hooks';
import { fetchArchivedChecklists } from '../domain/checklists/checklistActions';
import AppLayout from '../layout/AppLayout';

const Archive: React.FC = () => {
  const snackbar = useSnackbar();

  const [archivedChecklists, setArchivedChecklists] = useState(undefined);

  const [jwt, _] = useLocalStorage('authToken');

  // API callbacks
  const fetchAllArchivedChecklists = () => fetchArchivedChecklists(jwt)
    .then(data => setArchivedChecklists(data))
    .catch(() => snackbar.enqueueSnackbar('Archive fetch failed!', { variant: 'error' }));

  return (
    <AppLayout>
      <div>Archive</div>
    </AppLayout>
  )
};

export default Archive;
