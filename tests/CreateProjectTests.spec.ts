import { test, expect, chromium, Page, BrowserContext } from '@playwright/test';
import ProjectPage from '../pom/pages/ProfilePage/ProjectPage';
import NewProjectPage from '../pom/pages/ProfilePage/NewProjectPage';
import SignInPage from '../pom/pages/SignInPage';
import DeleteProjectConfirmation from '../pom/pages/ProfilePage/elements/DeleteProjectConfirmation'
import UserService from '../api/services/UserService';
import { getTestUsers } from '../test-data/testUsers';

const users = getTestUsers();
const testUser1 = users.randomUser1;

test.describe('Project Creation', () => {
    let projectPage: ProjectPage;
    let newProjectPage: NewProjectPage
    let signInPage: SignInPage;
    let context: BrowserContext;
    let page: Page;
    let deleteProjectConfirmation: DeleteProjectConfirmation;
    let userService: UserService;

    const randomPrefix = Date.now();
    const title = `TestAuto_${randomPrefix}`;
    const desc = `TestAutoDesc`;
    test.use({ storageState: 'test-data/states/testUser1-state.json' })

    // test.beforeAll(async ({ request }) => {
    //     const browser = await chromium.launch();
    //     context = await browser.newContext();
    //     page = await context.newPage();

    //     userService = new UserService(request);

    //     const response = await userService.createUser(testUser1.apiKey, username, email, password);
    //     expect(response.status()).toBe(201);
    // });

    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        
        signInPage = new SignInPage(page);
        projectPage = new ProjectPage(page);
        newProjectPage = new NewProjectPage(page);
        deleteProjectConfirmation = new DeleteProjectConfirmation(page)

        
        await projectPage.openPage(testUser1.userName);
    });

    test.afterEach(async ({ page }) => {
        if (await projectPage.projectLink.isVisible()) {
    await projectPage.clickDeleteProject();
    await deleteProjectConfirmation.confirmDeletion();
    await projectPage.checkProjectIsDeleted();
    }
    await page.close();
    });

    test('1. Create project', async () => {
        await projectPage.clickNewProject();
        await newProjectPage.createProjectWithATitle(title);
        await projectPage.checkProjectIsCreated(title);
    });


    test('2. Cancel creating a project', async () => {
        await projectPage.clickNewProject();
        await newProjectPage.cancelCreation();
        await projectPage.checkProjectIsDeleted();
    });

    test('3. Create a project with a description', async () => {
        await projectPage.clickNewProject();
        await newProjectPage.createProjectWithATitleDescription(title, desc);
        await projectPage.checkProjectIsCreated(title);
        await projectPage.chekDescription(desc);
    });

    test('4. Create a project without a title', async () => {
        await projectPage.clickNewProject();
        await newProjectPage.clickCreateButton();
        await newProjectPage.verifyValidationMessageisShown();
    });

    test('5. Verify description preview', async () => {
        await projectPage.clickNewProject();
        await newProjectPage.enterDescription(desc);
        await newProjectPage.verifyPreviewText(desc);
    });

    test('6. Create a project with a template', async () => {
        await projectPage.clickNewProject();
        await newProjectPage.enterTitle(title);
        await newProjectPage.selectTemplate("Basic Kanban");
        await newProjectPage.clickCreateButton();
        await projectPage.checkProjectIsCreated(title);
    });

    test('7. Create a project with a preview type', async () => {
        await projectPage.clickNewProject();
        await newProjectPage.enterTitle(title);
        await newProjectPage.selectPreview("Text Only");
        await newProjectPage.clickCreateButton();
        await projectPage.checkProjectIsCreated(title);
    });


    test.afterAll(async () => {
        await context.close();
    });
});