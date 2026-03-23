import { APP_URL } from "@/constant/config"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: `/api/admin`, credentials: "include" }),
    tagTypes: ["project", "skill", "about", "contact", "stat", "exp"],
    endpoints: (builder) => {
        return {

            getProject: builder.query<PROJECT_RESPONS, void>({
                query: () => {
                    return {
                        url: "/get-project",
                        method: "GET"
                    }
                },
                providesTags: ["project"]
            }),
            createProject: builder.mutation<PROJECT_RESPONS, PROJECT_REQUEST>({
                query: userData => {
                    return {
                        url: "/create-project",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["project"]
            }),
            updateProject: builder.mutation<UPDATE_RESPONCE, UPDATE_REQUEST>({
                query: userData => {
                    return {
                        url: "/update-project/" + userData._id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["project"]
            }),
            deleteProject: builder.mutation<DELETE_RESPONCE, DELETE_REQUEST>({
                query: useData => {
                    return {
                        url: "/delete-project/" + useData._id,
                        method: "DELETE",

                    }
                },
                invalidatesTags: ["project"]
            }),

            //experience
            getexp: builder.query<EXP_RESPONS, void>({
                query: () => {
                    return {
                        url: "/get-exp",
                        method: "GET"
                    }
                },
                providesTags: ["exp"]
            }),
            createexp: builder.mutation<EXP_RESPONS, EXP_REQUEST>({
                query: userData => {
                    return {
                        url: "/create-exp",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["exp"]
            }),
            updateExp: builder.mutation<UPDATE_EXP_RESPONCE, UPDATE_EXP_REQUEST>({
                query: userData => {
                    return {
                        url: "/update-exp/" + userData._id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["exp"]
            }),
            deleteExp: builder.mutation<DELETE__EXP_RESPONCE, DELETE_EXP_REQUEST>({
                query: useData => {
                    return {
                        url: "/delete-exp/" + useData._id,
                        method: "DELETE",

                    }
                },
                invalidatesTags: ["exp"]
            }),

            //skills
            getskill: builder.query<SKILL_RESPONS, void>({
                query: () => {
                    return {
                        url: "/get-skill",
                        method: "GET"
                    }
                },
                providesTags: ["skill"]
            }),
            creatskill: builder.mutation<SKILL_RESPONS, SKILL_REQUEST>({
                query: userData => {
                    return {
                        url: "/create-skill",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["skill"]
            }),
            updateskill: builder.mutation<UPDATE_SKILL_RESPONCE, UPDATE_SKILL_REQUEST>({
                query: userData => {
                    return {
                        url: "/update-skill/" + userData._id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["skill"]
            }),
            deleteskill: builder.mutation<DELETE__SKILL_RESPONCE, DELETE_SKILL_REQUEST>({
                query: userdata => {
                    return {
                        url: "/delete-skill/" + userdata._id,
                        method: "DELETE",

                    }
                },
                invalidatesTags: ["skill"]
            }),

            //statistiks

            getstat: builder.query<STAT_RESPONS, void>({
                query: () => {
                    return {
                        url: "/get-stat",
                        method: "GET"
                    }
                },
                providesTags: ["stat"]
            }),
            creatstat: builder.mutation<STAT_RESPONS, STAT_REQUEST>({
                query: userData => {
                    return {
                        url: "/create-stat",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["stat"]
            }),
            updatestat: builder.mutation<UPDATE_STAT_RESPONCE, UPDATE_STAT_REQUEST>({
                query: userData => {
                    return {
                        url: "/update-stat/" + userData._id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["stat"]
            }),
            deletestat: builder.mutation<DELETE__SKILL_RESPONCE, DELETE_STAT_REQUEST>({
                query: _id => {
                    return {
                        url: "/delete-stat/" + _id,
                        method: "DELETE",

                    }
                },
                invalidatesTags: ["stat"]
            }),

            //about

            getabout: builder.query<ABOUT_RESPONS, void>({
                query: () => {
                    return {
                        url: "/get-about",
                        method: "GET"
                    }
                },
                providesTags: ["about"]
            }),
            creatAbout: builder.mutation<ABOUT_RESPONS, ABOUT_REQUEST>({
                query: userData => {
                    return {
                        url: "/create-about",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["about"]
            }),
            updateAbout: builder.mutation<UPDATE_ABOUT_RESPONCE, UPDATE_ABOUT_REQUEST>({
                query: userData => {
                    return {
                        url: "/update-about/" + userData._id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["about"]
            }),
            deleteAbout: builder.mutation<DELETE__ABOUT_RESPONCE, DELETE_ABOUT_REQUEST>({
                query: _id => {
                    return {
                        url: "/delete-about/" + _id,
                        method: "DELETE",

                    }
                },
                invalidatesTags: ["about"]
            }),

            //contact
            getContact: builder.query<CONTACT_RESPONS, void>({
                query: () => {
                    return {
                        url: "/get-contact",
                        method: "GET"
                    }
                },
                providesTags: ["contact"]
            }),


            deleteContact: builder.mutation<DELETE_CONTACT_RESPONCE, DELETE_CONTACT_REQUEST>({
                query: userData => {
                    return {
                        url: "/delete-contact/" + userData._id,
                        method: "DELETE",

                    }
                },
                invalidatesTags: ["contact"]
            }),




        }
    }
})

export const { useCreatAboutMutation, useCreateProjectMutation, useCreateexpMutation, useCreatskillMutation, useCreatstatMutation, useDeleteAboutMutation
    , useDeleteContactMutation, useDeleteExpMutation, useDeleteProjectMutation, useDeleteskillMutation, useDeletestatMutation, useGetContactQuery, useGetProjectQuery
    , useGetaboutQuery, useGetexpQuery, useGetskillQuery, useGetstatQuery, useUpdateAboutMutation, useUpdateExpMutation, useUpdateProjectMutation, useUpdateskillMutation, useUpdatestatMutation, } = adminApi
