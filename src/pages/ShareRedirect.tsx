import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ShareRedirect = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${storyId || ''}`, { replace: true });
  }, [storyId, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground font-body">Redirecting…</p>
    </div>
  );
};

export default ShareRedirect;
