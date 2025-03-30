import ProfileForm from "@/components/profile/ProfileForm";
import { useAuth } from "@/hooks/useAuth";

export default function Profileview() {
  const { data, isLoading } = useAuth();
  if (isLoading) return <p>Cargando...</p>;
  if (data) return <ProfileForm data={data} />;
}
