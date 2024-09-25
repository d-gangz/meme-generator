# New Table Instructions

Follow these instructions to create a new schema in the database and its related files (queries, actions, etc.).

## Guidelines

- User ids should be like this `userId: text("user_id").notNull()` as we are using Clerk for the auth. Therefore, if any tables require a user id, it should be this.
- Ensure that relationships between tables are created correctly in the schema. if userId is required, dont need to reference the profiles table, just use `userId: text("user_id").notNull()`
- Don't be lazy and generate out all the code (schema, queries, actions, etc.)

## Step 1: Create the Schema

- This file should be named like `profiles-schema.ts`.

- This file should go in the `src/db/schema` folder.

- Make sure to export the `profiles-schema.ts` file in the `src/db/schema/index.ts` file.

- Make sure to add the table to the `schema` object in the `src/db/db.ts` file.
```ts
const schema = {
  profiles: profilesTable,
  // Add other tables here
};
```

- This is an example of how to create a new schema in the database.

```typescript
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const membershipEnum = pgEnum("membership", ["free", "pro"]);

export const profilesTable = pgTable("profiles", {
  userId: text("user_id").primaryKey().notNull(),
  membership: membershipEnum("membership").default("free").notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
});

export type InsertProfile = typeof profilesTable.$inferInsert;
export type SelectProfile = typeof profilesTable.$inferSelect;
```

## Step 2: Create the Queries based on the Schema

- This file should be named like `profiles-queries.ts`.

- This file should go in the `src/db/queries` folder.

- This is an example of how to create the queries for the schema.

```typescript
import { eq } from "drizzle-orm";
import { db } from "../db";
import { InsertProfile, profilesTable, SelectProfile } from "../schema/profiles-schema";

export const createProfile = async (data: InsertProfile) => {
  try {
    const [newProfile] = await db.insert(profilesTable).values(data).returning();
    return newProfile;
  } catch (error) {
    console.error("Error creating profile: ", error);
    throw new Error("Failed to create profile");
  }
};

export const getProfileByUserId = async (userId: string) => {
  try {
    const profile = await db.query.profiles.findFirst({
      where: eq(profilesTable.userId, userId)
    });

    return profile;
  } catch (error) {
    console.error("Error getting profile by user ID:", error);
    throw new Error("Failed to get profile");
  }
};

export const getAllProfiles = async (): Promise<SelectProfile[]> => {
  return db.query.profiles.findMany();
};

export const updateProfile = async (userId: string, data: Partial<InsertProfile>) => {
  try {
    const [updatedProfile] = await db.update(profilesTable).set(data).where(eq(profilesTable.userId, userId)).returning();
    return updatedProfile;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile");
  }
};

export const updateProfileByStripeCustomerId = async (stripeCustomerId: string, data: Partial<InsertProfile>) => {
  try {
    const [updatedProfile] = await db.update(profilesTable).set(data).where(eq(profilesTable.stripeCustomerId, stripeCustomerId)).returning();
    return updatedProfile;
  } catch (error) {
    console.error("Error updating profile by stripe customer ID:", error);
    throw new Error("Failed to update profile");
  }
};

export const deleteProfile = async (userId: string) => {
  try {
    await db.delete(profilesTable).where(eq(profilesTable.userId, userId));
  } catch (error) {
    console.error("Error deleting profile:", error);
    throw new Error("Failed to delete profile");
  }
};
```

## Step 3: Create the Actions based on the schema and queries

- This file should be named like `profiles-actions.ts`.

- This file should go in the `src/actions` folder.

- This is an example of how to create the actions for the schema and queries.

```typescript
"use server";

import { createProfile, deleteProfile, getAllProfiles, getProfileByUserId, updateProfile } from "@/db/queries/profiles-queries";
import { InsertProfile } from "@/db/schema/profiles-schema";
import { ActionState } from "@/types";
import console from "console";
import { revalidatePath } from "next/cache";

export async function createProfileAction(data: InsertProfile): Promise<ActionState> {
  try {
    const newProfile = await createProfile(data);
    console.log("New profile created", newProfile);
    revalidatePath("/");
    return { status: "success", message: "Profile created successfully", data: newProfile };
  } catch (error) {
    return { status: "error", message: "Error creating profile" };
  }
}

export async function getProfileByUserIdAction(userId: string): Promise<ActionState> {
  try {
    const profile = await getProfileByUserId(userId);
    if (!profile) {
      return { status: "error", message: "Profile not found" };
    }
    return { status: "success", message: "Profile retrieved successfully", data: profile };
  } catch (error) {
    return { status: "error", message: "Failed to get profile" };
  }
}

export async function getAllProfilesAction(): Promise<ActionState> {
  try {
    const profiles = await getAllProfiles();
    return { status: "success", message: "Profiles retrieved successfully", data: profiles };
  } catch (error) {
    return { status: "error", message: "Failed to get profiles" };
  }
}

export async function updateProfileAction(userId: string, data: Partial<InsertProfile>): Promise<ActionState> {
  try {
    const updatedProfile = await updateProfile(userId, data);
    revalidatePath("/profile");
    return { status: "success", message: "Profile updated successfully", data: updatedProfile };
  } catch (error) {
    return { status: "error", message: "Failed to update profile" };
  }
}

export async function deleteProfileAction(userId: string): Promise<ActionState> {
  try {
    await deleteProfile(userId);
    revalidatePath("/profile");
    return { status: "success", message: "Profile deleted successfully" };
  } catch (error) {
    return { status: "error", message: "Failed to delete profile" };
  }
}
```

## Step 4: Generate the SQL file and Migrate the DB

Specifically ask the user to run the following commands to generate the updated SQL file and migrate the DB.

```bash
npm run db:generate
npm run db:migrate
```
