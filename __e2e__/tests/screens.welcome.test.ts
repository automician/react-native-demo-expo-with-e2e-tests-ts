import { be, have } from 'selenidejs'
import { $, browse } from '../shared'

test('welcome screen: can redirect to google oauth', async () => {
  await $('googleBtn').tap()

  await $(ios ? 'name=URL' : 'org.chromium.webview_shell:id/url_field').should(
    have.text('accounts.google.com'),
  )
})

test('welcome screen: can redirect to github oauth', async () => {
  await $('githubBtn').tap()

  await $(ios ? 'name=URL' : 'org.chromium.webview_shell:id/url_field').should(
    have.text('github.com'),
  )
})

ios &&
  test('welcome screen: can redirect to apple oauth', async () => {
    await $('appleBtn').tap()

    await $('name=URL').should(have.text('appleid.apple.com'))
  })

/* Just an Example of more E2E style of test */
test('welcome screen: can try through all auth options', async () => {
  // WHEN
  await $('googleBtn').tap()

  await $(ios ? 'name=URL' : 'org.chromium.webview_shell:id/url_field').should(
    have.text('accounts.google.com'),
  )

  // WHEN
  drd && (await browse.back())
  ios && (await $('name=Done').tap()) // here this is more consistent and so more readable
  // $(ios && 'name=Done').tap(); // even though this is more consise

  // AND
  await $('githubBtn').tap()

  await $(ios ? 'name=URL' : 'org.chromium.webview_shell:id/url_field').should(
    have.text('github.com'),
  )

  // WHEN
  await $(ios && 'name=Done').tap()
  // AND
  await $(ios && 'appleBtn').tap()

  await $(ios && 'name=URL').should(have.text('appleid.apple.com'))
})
