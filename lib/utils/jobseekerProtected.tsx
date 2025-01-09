"use server"
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchUserAttributes, signOut } from 'aws-amplify/auth';
import { getProfile } from '@/lib/api/jobseeker/queries';

async function getUser() {
    "use server"
    try {
        const user = await fetchUserAttributes();
        return user;
    } catch (error) {
        console.error("Error fetching user attributes:", error);
        return null;
    }
}

async function getUserProfileDetails() {
    "use server"
    try {
        const data = await getProfile();
        return data?.getProfile;
    } catch (error) {
        console.error("Error fetching user profile details:", error);
        return null; // Important: Return null to avoid crashes
    }
}

export async function checkAuth(pathname: string) {
    "use server"
    if (pathname === "/jobseeker/registration") {
        return { authenticated: true, loading: false }; // Allow access to registration page
    }

    try {
        const user = await getUser();
        if (user) {
            const profileDetails = await getUserProfileDetails();
            if (!profileDetails?.cityWithState) {
                redirect('/jobseeker/registration'); // Redirect if profile incomplete
            }
            return { authenticated: true, loading: false };
        } else {
            await signOut(); // Sign out if no user
            redirect('/jobseeker/signin');
        }
    } catch (error) {
        console.error("Error in checkAuth:", error);
        redirect('/jobseeker/signin'); // Redirect on any error
    }
}


export default async function jobseekerProtected(Component: React.ComponentType) {
    "use server"
    return async function AuthWrapper(props: any) {
        const pathname = props?.router?.asPath || ''; // Get the current path
        const { authenticated, loading } = await checkAuth(pathname);

        if (loading) {
            // You can render a loading indicator here if needed
            return <div>Loading...</div>;
        }

        if (!authenticated) {
            // Redirect is handled within checkAuth, so this is redundant but kept for clarity
            return null; // Or a different fallback if needed
        }

        // Add user data to props for use in the wrapped component
        const userData = await getUser();
        const profileData = await getUserProfileDetails();
        return <Component {...props} user={userData} profile={profileData} />;
    };
}